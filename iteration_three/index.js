const recordPos = true; // determines whether positions are recorded with moves
var pos;
var dots = [];
var currentPlayer = "w";
var selectedSpot = { pos: "", piece: "" };
var w_en_passant = "";
var b_en_passant = "";
var w_castleLong = true;
var w_castleShort = true;
var b_castleLong = true;
var b_castleShort = true;
var keepHighlight = [];
var moveHistory = [];
var promoteMoveStore = []; // stored information for when pawn is promoting
var paused = false; // set to true when player input is needed before any other move should be made (pawn promotion)

// runs on page load
window.addEventListener("load", function () {
  // sets favicon
  let favicon = document.createElement("link");
  favicon.setAttribute("rel", "shortcut icon");
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    favicon.setAttribute("href", "assets/w_king.png");
  } else {
    favicon.setAttribute("href", "assets/b_king.png");
  }
  document.querySelector("head").appendChild(favicon);

  // puts pieces in their respective spots
  refreshBoard(spots);
});

function spotClicked(element) {
  if (paused) return;
  // initializing and/or setting variables
  pos = element.id.substr(4, 2);
  let clicked = spots.find((x) => x.pos == pos);

  if (clicked.piece.substring(0, 1) == currentPlayer) {
    // clicked spot is current player's piece
    removeDots();
    select(pos);
  } else {
    // clicked spot is opponent's or empty
    if (check__canMove(clicked)) {
      removeDots();
      movePiece(selectedSpot, clicked);
    }
  }
}

function select(position) {
  removeHightlights(keepHighlight);

  // initializing and/or setting variables
  selectedSpot = spots.find((x) => x.pos == position);
  let el_select = document.getElementById(`spot${selectedSpot.pos}`);

  // adds highlight and checks for any available moves
  el_select.classList.add("highlight");
  let possibleMoves = check__forMoves("selected", undefined, true);
  addDots(possibleMoves);
}

function movePiece(from, to) {
  // makes sure that both to and from are actually linked to the spots variable
  to = spots.find((x) => x.pos == to.pos);
  from = spots.find((x) => x.pos == from.pos);

  let special = ""; // used to signify special moves such as en passant or castling. Used in notation for moves
  let capture = to.piece != "";
  let refresh = [to.pos, from.pos]; // used to refresh any extra spaces, other than from and to
  let highlight = []; // allows to highlight any extra spaces, other than from and to
  let check = false;
  let ambiguity = [];
  let disambiguity = ""; // used to build prefix used to disambiguify moves

  // #region dealing with special cases
  // using en passant
  if (from.piece == "w_pawn" && to.pos == w_en_passant) {
    spots.find(
      (x) =>
        x.pos == `${parseInt(to.pos.substring(0, 1)) - 1}${to.pos.substring(1)}`
    ).piece = "";
    refresh.push(
      `${parseInt(to.pos.substring(0, 1)) - 1}${to.pos.substring(1)}`
    );
    special = "en passant";
  } else if (from.piece == "b_pawn" && to.pos == b_en_passant) {
    spots.find(
      (x) =>
        x.pos == `${parseInt(to.pos.substring(0, 1)) + 1}${to.pos.substring(1)}`
    ).piece = "";
    refresh.push(
      `${parseInt(to.pos.substring(0, 1)) + 1}${to.pos.substring(1)}`
    );
    special = "en passant";
  }
  // resets en passant spaces
  b_en_passant = "";
  w_en_passant = "";
  // creating en passant
  if (
    from.piece == "w_pawn" &&
    parseInt(from.pos.substring(0, 1)) + 2 == to.pos.substring(0, 1)
  ) {
    b_en_passant = `${parseInt(from.pos.substring(0, 1)) + 1}${parseInt(
      from.pos.substring(1)
    )}`;
  } else if (
    from.piece == "b_pawn" &&
    parseInt(from.pos.substring(0, 1)) - 2 == to.pos.substring(0, 1)
  ) {
    w_en_passant = `${parseInt(from.pos.substring(0, 1)) - 1}${parseInt(
      from.pos.substring(1)
    )}`;
  }
  // deals with castling
  if (
    from.piece.substring(2) == "king" &&
    Math.abs(
      parseInt(from.pos.substring(1, 2) - parseInt(to.pos.substring(1, 2)))
    ) == 2
  ) {
    if (to.pos.substring(1, 2) == "3") {
      // castle long
      spots.find((k) => k.pos == `${from.pos.substring(0, 1)}1`).piece = "";
      spots.find(
        (k) => k.pos == `${from.pos.substring(0, 1)}4`
      ).piece = `${currentPlayer}_rook`;
      refresh.push(
        `${from.pos.substring(0, 1)}1`,
        `${from.pos.substring(0, 1)}4`
      );
      highlight.push(`${from.pos.substring(0, 1)}4`);
      special = "castle long";
    } else if (to.pos.substring(1, 2) == "7") {
      // castle short
      spots.find((k) => k.pos == `${from.pos.substring(0, 1)}8`).piece = "";
      spots.find(
        (k) => k.pos == `${from.pos.substring(0, 1)}6`
      ).piece = `${currentPlayer}_rook`;
      refresh.push(
        `${from.pos.substring(0, 1)}8`,
        `${from.pos.substring(0, 1)}6`
      );
      highlight.push(`${from.pos.substring(0, 1)}6`);
      special = "castle short";
    }
  }
  // pawn promotion
  if (from.piece == "w_pawn" && to.pos.substring(0, 1) == 8) {
    promotion("w", to.pos, to, from);
    promoteMoveStore = [
      from.pos,
      to.pos,
      to.piece,
      capture,
      special,
      check,
      disambiguity,
    ];
    return;
  } else if (from.piece == "b_pawn" && to.pos.substring(0, 1) == 1) {
    promotion("b", to.pos, to, from);
    promoteMoveStore = [
      from.pos,
      to.pos,
      to.piece,
      capture,
      special,
      check,
      disambiguity,
    ];
    return;
  }
  // dealing with ambiguity
  if (from.piece.substring(2) != "pawn") {
    ambiguity = checkAmbiguity(from.pos, to.pos, from.piece); // returns [ambiguous (boolean), file ambiguity (boolean), rank ambiguity (boolean)]
    if (ambiguity[0]) {
      if (!ambiguity[1]) {
        disambiguity = numberToLetter(from.pos.substring(1, 2));
      } else if (!ambiguity[2]) {
        disambiguity = from.pos.substring(0, 1);
      } else {
        disambiguity =
          numberToLetter(from.pos.substring(1, 2)) + from.pos.substring(0, 1);
      }
    }
  }
  // #endregion dealing with special cases

  // adds piece captured to display for captured pieces
  if (to.piece != "") {
    document.getElementById(
      `${currentPlayer}_captures`
    ).innerHTML += `<img src="assets/${
      to.piece
    }.png" alt="capture - ${to.piece.substring(2)}">`;
  }

  // moves "from" piece to "to" spot
  to.piece = from.piece;
  from.piece = "";

  // refreshes display, essentially
  refreshBoard(spots);

  // removes possiblities of castling based on spot that piece was on. (even if another piece happens to be on that spot, this means that the rook/king has already been moved, so setting the variable to false again will not create any problems)
  switch (from.pos) {
    case "81":
      b_castleLong = false;
      break;
    case "88":
      b_castleShort = false;
      break;
    case "85":
      b_castleLong = false;
      b_castleShort = false;
      break;
    case "11":
      w_castleLong = false;
      break;
    case "15":
      w_castleLong = false;
      w_castleShort = false;
      break;
    case "18":
      b_castleShort = false;
      break;
  }
  keepHighlight = [to.pos, from.pos];
  for (i = 0; i < highlight.length; i++) {
    keepHighlight.push(highlight[i]);
  }
  removeHightlights(keepHighlight);
  let checks = [];
  if (currentPlayer == "w") {
    checks = check__forChecks("b");
  } else {
    checks = check__forChecks("w");
  }
  if (checks[0]) check = true;
  let move = recordMove(
    from.pos,
    to.pos,
    to.piece,
    capture,
    special,
    check,
    disambiguity
  );
  addToHistory(move);
  switchPlayer();
}

function check__canMove(clickedSpot) {
  // just checks if the spot has a dot on it. Dots are set on select, so they should be same as any possible moves
  let result = false;
  if (dots.find((x) => x == clickedSpot.pos) != undefined) result = true;
  return result;
}

function check__forMoves(code, piece, checkChecks) {
  // "code" shows which piece is being checked
  // Options include:
  //  - selected (piece not necessary in this case)
  //  - input a spot

  // initializing and/or setting variables
  let spot;
  let patterns;

  // checks for "code" and sets spot, piece
  switch (code) {
    case "selected":
      spot = selectedSpot;
      piece = spot.piece.split("_");
      break;
    default:
      spot = code;
      piece = piece.split("_");
      break;
  }

  // checks if piece is gone, will king be in check. If not, don't check for checks in runPatterns (there is no way in chess for a piece to force a check upon the player if it can be removed and not cause a discovered check)
  if (
    checkChecks &&
    spots.find((x) => x.pos == spot.pos).piece.substring(2) != "king"
  ) {
    spots.find((x) => x.pos == spot.pos).piece = "";
    checkChecks = check__forChecks(currentPlayer)[0];
    spots.find((x) => x.pos == spot.pos).piece = `${piece[0]}_${piece[1]}`;
  }

  // sets patterns based on piece
  switch (piece[1]) {
    case "pawn":
      if (piece[0] == "w") {
        patterns = moves[0];
      } else {
        patterns = moves[1];
      }
      break;
    case "rook":
      patterns = moves[2];
      break;
    case "knight":
      patterns = moves[3];
      break;
    case "bishop":
      patterns = moves[4];
      break;
    case "queen":
      patterns = moves[5];
      break;
    case "king":
      patterns = moves[6];
      break;
  }

  let possibleMoves = runPatterns(patterns, spot.pos, piece[0], checkChecks);
  return possibleMoves;
}

function runPatterns(patterns, currentSpot, player, checkChecks) {
  // initializing and/or setting variables
  let x = currentSpot.toString().slice("")[1];
  let y = currentSpot.toString().slice("")[0];
  let piece = spots.find((k) => k.pos == currentSpot).piece;
  // variables that will be set/changed later in function
  let cont = true; // short for continue, allows function to handle "+" and "-" patterns
  let x_change;
  let y_change;
  let x_out;
  let y_out;
  let conditions;
  let possibilities = []; // possible outputs (before checking for checks) is built on this
  let final = []; // output is built on this variable
  let passed = true; // allows conditions to prevent output possibility

  // running through all possible patterns for given piece
  for (i = 0; i < patterns.length; i++) {
    // resetting variables to defaults
    passed = true;
    conditions = patterns[i].conditions.slice(",");
    cont = true;

    // checking for any "+" or "-" patterns (only both, not one)
    switch (patterns[i].pattern) {
      case "+ +":
        for (j = 1; j <= 8 - x; j++) {
          if (j <= 8 - y) {
            let out = spots.find(
              (k) => k.pos == `${parseInt(y) + j}${parseInt(x) + j}`
            );
            if (out.piece.substring(0, 1) == player) {
              break;
            } else if (out.piece == "") {
              possibilities.push(`${out.pos}`);
            } else {
              possibilities.push(`${out.pos}`);
              break;
            }
          }
        }
        cont = false;
        break;
      case "+ -":
        for (j = 1; j <= 8 - x; j++) {
          if (y - j >= 1) {
            let out = spots.find(
              (k) => k.pos == `${parseInt(y) - j}${parseInt(x) + j}`
            );
            if (out.piece.substring(0, 1) == player) {
              break;
            } else if (out.piece == "") {
              possibilities.push(`${out.pos}`);
            } else {
              possibilities.push(`${out.pos}`);
              break;
            }
          }
        }
        cont = false;
        break;
      case "- +":
        for (j = 1; x - j >= 1; j++) {
          if (j <= 8 - y) {
            let out = spots.find(
              (k) => k.pos == `${parseInt(y) + j}${parseInt(x) - j}`
            );
            if (out.piece.substring(0, 1) == player) {
              break;
            } else if (out.piece == "") {
              possibilities.push(`${out.pos}`);
            } else {
              possibilities.push(`${out.pos}`);
              break;
            }
          }
        }
        cont = false;
        break;
      case "- -":
        for (j = 1; x - j >= 1; j++) {
          if (y - j >= 1) {
            let out = spots.find(
              (k) => k.pos == `${parseInt(y) - j}${parseInt(x) - j}`
            );
            if (out.piece.substring(0, 1) == player) {
              break;
            } else if (out.piece == "") {
              possibilities.push(`${out.pos}`);
            } else {
              possibilities.push(`${out.pos}`);
              break;
            }
          }
        }
        cont = false;
        break;
    }

    // makes sure special case ("+" or "-") on both x and y has not been previously used
    if (cont) {
      // get data and set to variables
      x_change = patterns[i].pattern.split(" ")[0];
      y_change = patterns[i].pattern.split(" ")[1];
      conditions = patterns[i].conditions.split(",");

      // checking for any "+" or "-" patterns (only one, not both)
      switch (x_change) {
        case "+":
          for (j = 1; j <= 8 - x; j++) {
            let out = spots.find((k) => k.pos == `${y}${parseInt(x) + j}`);
            if (out.piece.substring(0, 1) == player) {
              break;
            } else if (out.piece == "") {
              possibilities.push(`${out.pos}`);
            } else {
              possibilities.push(`${out.pos}`);
              break;
            }
          }
          cont = false;
          break;
        case "-":
          for (j = 1; x - j >= 1; j++) {
            let out = spots.find((k) => k.pos == `${y}${parseInt(x) - j}`);
            if (out.piece.substring(0, 1) == player) {
              break;
            } else if (out.piece == "") {
              possibilities.push(`${out.pos}`);
            } else {
              possibilities.push(`${out.pos}`);
              break;
            }
          }
      }

      // makes sure special case for x only has not been used
      if (cont) {
        switch (y_change) {
          case "+":
            for (j = 1; j <= 8 - y; j++) {
              let out = spots.find((k) => k.pos == `${parseInt(y) + j}${x}`);
              if (out.piece.substring(0, 1) == player) {
                break;
              } else if (out.piece == "") {
                possibilities.push(`${out.pos}`);
              } else {
                possibilities.push(`${out.pos}`);
                break;
              }
            }
            cont = false;
            break;
          case "-":
            for (j = 1; y - j >= 1; j++) {
              let out = spots.find((k) => k.pos == `${parseInt(y) - j}${x}`);
              if (out.piece.substring(0, 1) == player) {
                break;
              } else if (out.piece == "") {
                possibilities.push(`${out.pos}`);
              } else {
                possibilities.push(`${out.pos}`);
                break;
              }
            }
            cont = false;
            break;
        }
      }

      // makes sure special case ("+" or "-") has not been previously used
      if (cont) {
        x_out = parseInt(x) + parseInt(x_change);
        y_out = parseInt(y) + parseInt(y_change);

        // checks to be sure that any outputs are inside of the board
        if (x_out <= 8 && x_out >= 1 && y_out <= 8 && y_out >= 1) {
          // checks conditions against move possibility
          for (j = 0; j < conditions.length; j++) {
            switch (conditions[j]) {
              case "capture":
                if (spots.find((k) => k.pos == `${y_out}${x_out}`).piece == "")
                  passed = false;
                break;
              case "not capture":
                if (spots.find((k) => k.pos == `${y_out}${x_out}`).piece != "")
                  passed = false;
                break;
              case "en_passant":
                if (player == "w") {
                  if (w_en_passant != `${y_out}${x_out}`) passed = false;
                } else {
                  if (b_en_passant != `${y_out}${x_out}`) passed = false;
                }
                break;
              case "castle-long":
                if (player == "w") {
                  if (!w_castleLong) {
                    passed = false;
                  }
                } else {
                  if (!b_castleLong) {
                    passed = false;
                  }
                }
                break;
              case "castle-short":
                if (player == "w") {
                  if (!w_castleShort) {
                    passed = false;
                  }
                } else {
                  if (!b_castleShort) {
                    passed = false;
                  }
                }
                break;
              default:
                if (conditions[j] == "") break;
                if (conditions[j].indexOf(" ") == -1) break;
                let command = conditions[j].split(" ")[0];
                let coord = conditions[j].split(" ")[1];
                if (coord.substring(0, 1) == "y") {
                  coord = `${coord.substring(2)}${x}`;
                } else if (coord.substring(0, 1) == "x") {
                  coord = `${y}${coord.substring(2)}`;
                }
                if (command == "on") {
                  if (`${y}${x}` != coord) {
                    passed = false;
                  }
                } else if (command == "empty") {
                  if (spots.find((x) => x.pos == coord).piece != "") {
                    passed = false;
                  }
                }
                break;
            }
          }

          // removes possibility if it is on a space that contains current player's piece
          if (
            spots.find((k) => k.pos == `${y_out}${x_out}`).piece.slice(0, 1) ==
            player
          )
            passed = false;

          // pushes possibility into possibilities variable
          if (passed) possibilities.push(`${y_out}${x_out}`);
        }
      }
    }
  }

  // if checks must be checked, see if move would put player into check
  if (checkChecks) {
    for (g = 0; g < possibilities.length; g++) {
      if (
        testMoveForChecks(
          x,
          y,
          possibilities[g].substring(1, 2),
          possibilities[g].substring(0, 1),
          player,
          piece
        )
      ) {
        final.push(possibilities[g]);
      }
    }
  } else {
    // if checks mustn't be checked, return any possible moves (without regard to illegal moves due to self-imposed checks)
    return possibilities;
  }

  // returns possible moves to be used however necessary
  return final;
}

function removeHightlights(keep) {
  // gets highlights using .getElementsByClassName, as discrepencies don't matter between JS and HTML (highlights serve no technical purpose)
  let highlights = document.getElementsByClassName("highlight");
  for (i = highlights.length - 1; i >= 0; i--) {
    highlights[i].classList.remove("highlight");
  }

  // "keep" variable allows for code to keep certain spots highlighted (ex: previous move and all spots utilized in it should stay highlighted, even when opponent selects a piece)
  if (keep == []) return;
  for (i = keep.length - 1; i >= 0; i--) {
    document.getElementById(`spot${keep[i]}`).classList.add("highlight");
  }
}

function addDots(spots) {
  // goes through array of spots that should have dots, adds them to local variable, then to HTML as classes
  for (i = 0; i < spots.length; i++) {
    dots.push(spots[i]);
    document.getElementById(`spot${spots[i]}`).classList.add("dot");
  }
}

function removeDots() {
  // removes dots from actual display (styled by css, utilizing classes)
  for (i = 0; i < dots.length; i++) {
    document.getElementById(`spot${dots[i]}`).classList.remove("dot");
  }
  // removes dots from local JavaScript variable (used in order to prevent discrepencies between HTML and JS from messing up gameplay, though it may mess up the display)
  dots = [];
}

function switchPlayer() {
  // if you don't understand what this is doing, then please go take a course on JavaScript
  if (currentPlayer == "w") {
    currentPlayer = "b";
    document.getElementById("turn").innerText = "Black's Move";
  } else {
    currentPlayer = "w";
    document.getElementById("turn").innerText = "White's Move";
  }
}

function recordMove(from, to, piece, capture, special, isCheck, disambiguity) {
  // initializing and setting extra variables
  let move = "";
  let player = piece.substring(0, 1);
  let skip = false;
  let suffix = "";
  // sets piece to only the actual piece, not including "w_" or "b_"
  piece = piece.substring(2);

  // checks for any special cases that would be represented differently. These include:
  //  - castle (long or short)
  //  - en passant
  switch (special) {
    case "castle long":
      move = "0-0-0";
      skip = true;
      break;
    case "castle short":
      move = "0-0";
      skip = true;
      break;
    case "en passant":
      capture = true;
      break;
    case "promote":
      let promotedTo;
      switch (piece) {
        case "knight":
          promotedTo = "N";
          break;
        default:
          promotedTo = piece.substring(0, 1).toUpperCase();
          break;
      }
      suffix = promotedTo;
      piece = "pawn";
      break;
  }

  if (!skip) {
    // changes piece name to its 1-letter (or no letter, in case of pawn) notation
    switch (piece) {
      case "pawn":
        piece = "";
        break;
      case "knight":
        piece = "N";
        break;
      default:
        piece = piece.substring(0, 1).toUpperCase();
        break;
    }

    // checks if pawn
    if (piece == "") {
      // if pawn captured, use "from"'s x as piece name
      if (from.substring(1, 2) != to.substring(1, 2)) {
        piece = numberToLetter(from.substring(1, 2));
      }
    }

    let toNot = numberToLetter(to.substring(1, 2)) + to.substring(0, 1); // toNot = toNotation
    if (capture) move = disambiguity + piece + "x" + toNot + suffix;
    if (!capture) move = disambiguity + piece + toNot + suffix;
  }

  // adds + to end of move if it puts other player into check
  if (isCheck) move += "+";

  // if the position after the move is played should be stored,
  if (recordPos) {
    let currentPos = [];
    for (i = 0; i < spots.length; i++) {
      // for every position, remove if the piece is not there (allows for significantly less storage necessity)
      if (spots[i].piece != "") {
        currentPos.push(spots[i]);
      }
    }
    // push move, with position after move
    moveHistory.push({ player: player, move: move, curPos: currentPos });
  } else {
    // push move, without position after move
    moveHistory.push({ player: player, move: move });
  }

  return moveHistory[moveHistory.length - 1];
}

function addToHistory(move) {
  console.log(move);
  // if the player is white, then add a number to be displayed on hover, indicating the number of moves each player would be on on that respective move
  if (move.player == "w") {
    document.getElementById("move_num").innerHTML += `<span>${Math.ceil(
      moveHistory.length / 2
    )}</span>`;
  }
  // no matter who the player is, add the move's shorthand to the movelist (no table is necessary, using "display: grid" in css)
  document.getElementById("move_list").innerHTML += `<span>${move.move}</span>`;
}

function check__forChecks(player) {
  // initializing and setting variables
  let kingPos = spots.find((x) => x.piece == `${player}_king`);
  let checks = [];
  let opponent;
  let kingMoves = [];
  // set opponent to the other player
  if (player == "w") {
    opponent = "b";
  } else {
    opponent = "w";
  }

  // running through pieces and their respective possible moves
  for (k = 0; k < pieces.length; k++) {
    // checks moves that a piece of every kind could make if in place of the king
    kingMoves = check__forMoves(kingPos, `${player}_${pieces[k]}`, false);

    // if it has possible moves, check every move
    if (kingMoves.length > 0) {
      for (j = 0; j < kingMoves.length; j++) {
        // if any of the possible moves would capture the opponent's piece of the same kind as being checked, then that piece at that position could take the king
        if (
          spots.find((x) => x.pos == kingMoves[j]).piece ==
          `${opponent}_${pieces[k]}`
        )
          // if this is true, push the check's position and piece causing check to variable
          checks.push({ at: kingMoves[j], piece: pieces[k] });
      }
    }
  }

  // return (1) whether or not there are any checks and (2) the array of all checks, their positions, and pieces
  return [checks.length > 0, checks];
}

function testMoveForChecks(
  x_before,
  y_before,
  x_after,
  y_after,
  player,
  piece
) {
  // sets pieces to a certain variable so that it can be placed back afterwards
  let inPiece = spots.find((k) => k.pos == `${y_before}${x_before}`).piece;
  let outPiece = spots.find((k) => k.pos == `${y_after}${x_after}`).piece;

  // removes piece from spot "from" and places piece in spot "to"
  spots.find((k) => k.pos == `${y_before}${x_before}`).piece = "";
  spots.find((k) => k.pos == `${y_after}${x_after}`).piece = piece;

  // checks for checks with move made
  let passed = !check__forChecks(player)[0];

  // puts pieces back in their respective spots
  spots.find((k) => k.pos == `${y_before}${x_before}`).piece = inPiece;
  spots.find((k) => k.pos == `${y_after}${x_after}`).piece = outPiece;

  // returns whether or not the possibility should be passed (the opposite of whether or not it would cause a check)
  return passed;
}

function refreshBoard(boardCondition) {
  for (i = 0; i < boardCondition.length; i++) {
    if (boardCondition[i].piece == "") {
      document.getElementById(
        `spot${boardCondition[i].pos}`
      ).style.backgroundImage = "";
    } else {
      document.getElementById(
        `spot${boardCondition[i].pos}`
      ).style.backgroundImage = `url(assets/${boardCondition[i].piece}.png)`;
    }
  }
}

function checkAmbiguity(from, to, piece) {
  from = spots.find((g) => g.pos == from);
  to = spots.find((g) => g.pos == to);

  let toPiece = to.piece;
  let opponent;
  let ambiguousSpots = [];
  let y_ambiguous = false;
  let x_ambiguous = false;

  if (currentPlayer == "w") {
    opponent = "b";
  } else {
    opponent = "w";
  }

  from.piece = "";
  to.piece = `${opponent}_${piece.substring(2)}`;
  let movePoss = check__forMoves(
    to,
    `${opponent}_${piece.substring(2)}`,
    false
  );
  for (g = 0; g < movePoss.length; g++) {
    if (spots.find((n) => n.pos == movePoss[g]).piece == piece) {
      ambiguousSpots.push(movePoss[g]);
    }
  }

  from.piece = piece;
  to.piece = toPiece;

  if (ambiguousSpots.length == 0) {
    return [false];
  } else {
    for (g = 0; g < ambiguousSpots.length; g++) {
      if (ambiguousSpots[g].substring(0, 1) == from.pos.substring(0, 1)) {
        y_ambiguous = true;
      }
      if (ambiguousSpots[g].substring(1, 2) == from.pos.substring(1, 2)) {
        x_ambiguous = true;
      }
    }
    return [ambiguousSpots.length > 0, x_ambiguous, y_ambiguous];
  }
}

function promotion(player, spot, to, from) {
  // styling promotion choice plaque
  paused = true;
  let el = document.getElementById(`spot${spot}`);
  let elementProps = el.getBoundingClientRect();
  let position = [elementProps.left, elementProps.top];
  let size = [elementProps.width, elementProps.height * 4];
  let promoteEl = document.getElementById("promote");
  let children = promoteEl.children;
  children[0].src = `assets/${player}_queen.png`;
  children[1].src = `assets/${player}_rook.png`;
  children[2].src = `assets/${player}_knight.png`;
  children[3].src = `assets/${player}_bishop.png`;
  promoteEl.style.left = `${position[0]}px`;
  if (player == "b") {
    position[1] = position[1] - size[1] * 0.75;
  }
  promoteEl.style.top = `${position[1]}px`;
  promoteEl.style.width = `${size[0]}px`;
  promoteEl.style.height = `${size[1]}px`;
  promoteEl.style.display = "grid";
  setTimeout(() => {
    promoteEl.style.opacity = "1";
  }, 1);

  // changing highlights
  keepHighlight = [to.pos, from.pos];
  removeHightlights(keepHighlight);
}

function promotePiece(piece) {
  let from = spots.find((x) => x.pos == promoteMoveStore[0]);
  let to = spots.find((x) => x.pos == promoteMoveStore[1]);
  let capture = promoteMoveStore[3];
  let special = "promote";
  let check = false;
  let disambiguity = "";

  // adds piece captured to display for captured pieces
  if (to.piece != "") {
    document.getElementById(
      `${currentPlayer}_captures`
    ).innerHTML += `<img src="assets/${
      to.piece
    }.png" alt="capture - ${to.piece.substring(2)}">`;
  }

  // moves "from" piece to "to" spot
  to.piece = `${currentPlayer}_${piece}`;
  from.piece = "";

  // refreshes display, essentially
  refreshBoard(spots);

  keepHighlight = [to.pos, from.pos];
  removeHightlights(keepHighlight);
  let checks = [];
  if (currentPlayer == "w") {
    checks = check__forChecks("b");
  } else {
    checks = check__forChecks("w");
  }
  if (checks[0]) check = true;
  let move = recordMove(
    from.pos,
    to.pos,
    `${currentPlayer}_${piece}`,
    capture,
    special,
    check,
    disambiguity
  );
  addToHistory(move);
  switchPlayer();

  document.getElementById("promote").style.display = "none";

  paused = false;
}
