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
  for (i = 0; i < spots.length; i++) {
    if (spots[i].piece != "") {
      document.getElementById(
        `spot${spots[i].pos}`
      ).style.backgroundImage = `url(assets/${spots[i].piece}.png)`;
    }
  }
});

function spotClicked(element) {
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
  for (i = 0; i < refresh.length; i++) {
    if (spots.find((x) => x.pos == refresh[i]).piece == "") {
      document.getElementById(`spot${refresh[i]}`).style.backgroundImage = "";
    } else {
      document.getElementById(
        `spot${refresh[i]}`
      ).style.backgroundImage = `url(assets/${
        spots.find((x) => x.pos == refresh[i]).piece
      }.png`;
    }
  }

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
  let move = recordMove(from.pos, to.pos, to.piece, capture, special, check);
  addToHistory(move);
  switchPlayer();
}

function check__canMove(clickedSpot) {
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

  // checks if piece is gone, will king be in check. If not, don't check for checks in runPatterns
  if (checkChecks) {
    if (piece[1] == "king") {
      checkChecks = false;
    } else {
      spots.find((x) => x.pos == spot.pos).piece = "";
      checkChecks = check__forChecks(currentPlayer)[0];
      spots.find((x) => x.pos == spot.pos).piece = `${piece[0]}_${piece[1]}`;
    }
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
  // variables that will be set/changed later in function
  let cont = true; // short for continue, allows function to handle "+" and "-" patterns
  let x_change;
  let y_change;
  let x_out;
  let y_out;
  let conditions;
  let possibilities = []; // output is built on this variable
  let passed = true; // allows conditions to prevent output possibility

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
              if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
                possibilities.push(`${out.pos}`);
            } else {
              if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
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
              if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
                possibilities.push(`${out.pos}`);
            } else {
              if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
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
              if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
                possibilities.push(`${out.pos}`);
            } else {
              if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
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
              if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
                possibilities.push(`${out.pos}`);
            } else {
              if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
                possibilities.push(`${out.pos}`);
              break;
            }
          }
        }
        cont = false;
        break;
    }

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
              if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
                possibilities.push(`${out.pos}`);
            } else {
              if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
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
              if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
                possibilities.push(`${out.pos}`);
            } else {
              if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
                possibilities.push(`${out.pos}`);
              break;
            }
          }
      }
      if (cont) {
        switch (y_change) {
          case "+":
            for (j = 1; j <= 8 - y; j++) {
              let out = spots.find((k) => k.pos == `${parseInt(y) + j}${x}`);
              if (out.piece.substring(0, 1) == player) {
                break;
              } else if (out.piece == "") {
                if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
                  possibilities.push(`${out.pos}`);
              } else {
                if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
                  possibilities.push(`${out.pos}`);
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
                if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
                  possibilities.push(`${out.pos}`);
              } else {
                if (bypassPassedCheckChecks(checkChecks, x, y, out, player))
                  possibilities.push(`${out.pos}`);
              }
            }
            cont = false;
            break;
        }
      }

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

          // if checks must be checked, see if move would put player into check
          if (checkChecks) {
            passed = testMoveForChecks(x, y, x_out, y_out, player);
          }

          // pushes possibility into output variable
          if (passed) possibilities.push(`${y_out}${x_out}`);
        }
      }
    }
  }

  // returns possible moves to be used however necessary
  return possibilities;
}

function removeHightlights(keep) {
  let highlights = document.getElementsByClassName("highlight");
  for (i = highlights.length - 1; i >= 0; i--) {
    highlights[i].classList.remove("highlight");
  }
  if (keep == []) return;
  for (i = keep.length - 1; i >= 0; i--) {
    document.getElementById(`spot${keep[i]}`).classList.add("highlight");
  }
}

function addDots(spots) {
  for (i = 0; i < spots.length; i++) {
    dots.push(spots[i]);
    document.getElementById(`spot${spots[i]}`).classList.add("dot");
  }
}

function removeDots() {
  for (i = 0; i < dots.length; i++) {
    document.getElementById(`spot${dots[i]}`).classList.remove("dot");
  }
  dots = [];
}

function switchPlayer() {
  if (currentPlayer == "w") {
    currentPlayer = "b";
    document.getElementById("turn").innerText = "Black's Move";
  } else {
    currentPlayer = "w";
    document.getElementById("turn").innerText = "White's Move";
  }
}

function recordMove(from, to, piece, capture, special, isCheck) {
  let move = "";
  let player = piece.substring(0, 1);
  let skip = false;
  piece = piece.substring(2);

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

    let toNot = numberToLetter(to.substring(1, 2)) + to.substring(0, 1);
    if (capture) move = piece + "x" + toNot;
    if (!capture) move = piece + toNot;
  }

  if (isCheck) move += "+";

  if (recordPos) {
    let currentPos = [];
    for (i = 0; i < spots.length; i++) {
      if (spots[i].piece != "") {
        currentPos.push(spots[i]);
      }
    }
    moveHistory.push({ player: player, move: move, curPos: currentPos });
  } else {
    moveHistory.push({ player: player, move: move });
  }

  return moveHistory[moveHistory.length - 1];
}

function addToHistory(move) {
  if (move.player == "w") {
    document.getElementById("move_num").innerHTML += `<span>${Math.ceil(
      moveHistory.length / 2
    )}</span>`;
  }
  document.getElementById("move_list").innerHTML += `<span>${move.move}</span>`;
}

function check__forChecks(player) {
  // initializing and setting variables
  let kingPos = spots.find((x) => x.piece == `${player}_king`);
  let checks = [];
  let opponent;
  let kingMoves = [];
  if (player == "w") {
    opponent = "b";
  } else {
    opponent = "w";
  }

  // running through pieces and their respective possible moves
  for (k = 0; k < pieces.length; k++) {
    kingMoves = check__forMoves(kingPos, `${player}_${pieces[k]}`, false);
    if (kingMoves.length > 0) {
      for (j = 0; j < kingMoves.length; j++) {
        if (
          spots.find((x) => x.pos == kingMoves[j]).piece ==
          `${opponent}_${pieces[k]}`
        )
          checks.push({ at: kingMoves[j], piece: pieces[k] });
      }
    }
  }

  return [checks.length > 0, checks];
}

function testMoveForChecks(x_before, y_before, x_after, y_after, player) {
  let inPiece = spots.find((k) => k.pos == `${y_before}${x_before}`).piece;
  let outPiece = spots.find((k) => k.pos == `${y_after}${x_after}`).piece;
  spots.find((k) => k.pos == `${y_before}${x_before}`).piece = "";
  spots.find((k) => k.pos == `${y_after}${x_after}`).piece = `${player}_pawn`;
  let passed = !check__forChecks(player)[0];
  spots.find((k) => k.pos == `${y_before}${x_before}`).piece = inPiece;
  spots.find((k) => k.pos == `${y_after}${x_after}`).piece = outPiece;
  return passed;
}

function bypassPassedCheckChecks(checkChecks, x, y, out, player) {
  if (
    checkChecks &&
    testMoveForChecks(
      x,
      y,
      out.pos.substring(1, 2),
      out.pos.substring(0, 1),
      player
    )
  ) {
    return true;
  } else {
    if (!checkChecks) {
      return true;
    }
  }
  return false;
}
