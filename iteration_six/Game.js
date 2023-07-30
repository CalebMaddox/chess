function coordsToIndex(rank, file) {
  return Math.abs(rank - 8) * 8 + (file - 1);
}
function indexToCoords(index) {
  let rank = Math.ceil(Math.abs(index / 8 - 8));
  let file = (index % 8) + 1;
  return { rank: rank, file: file };
}

function isInCheck(board, player) {
  let kingIndex = board.indexOf(player === "white" ? "K" : "k");

  return isAttacked(kingIndex, board, player);
}
function isAttacked(pieceIndex, board, player) {
  let res = false;
  let boardArr = board.split("");

  let enemyPieces = player === "white" ? ["p", "r", "n", "b", "q", "k"] : ["P", "R", "N", "B", "Q", "K"];

  // #region pawns
  boardArr[pieceIndex] = new Pawn(indexToCoords(pieceIndex), player);
  let moves = boardArr[pieceIndex].possibleMoves(
    board,
    { white: { short: false, long: false }, black: { short: false, long: false } },
    { rank: null, file: null },
    false
  );
  moves.forEach((move) => {
    if (boardArr[coordsToIndex(move.rank, move.file)] === enemyPieces[0]) {
      res = true;
      return;
    }
  });
  if (res) return true;
  // #endregion
  // #region rooks
  boardArr[pieceIndex] = new Rook(indexToCoords(pieceIndex), player);
  moves = boardArr[pieceIndex].possibleMoves(
    board,
    { white: { short: false, long: false }, black: { short: false, long: false } },
    { rank: null, file: null },
    false
  );
  moves.forEach((move) => {
    if (boardArr[coordsToIndex(move.rank, move.file)] === enemyPieces[1]) {
      res = true;
      return;
    }
  });
  if (res) return true;
  // #endregion
  // #region knights
  boardArr[pieceIndex] = new Knight(indexToCoords(pieceIndex), player);
  moves = boardArr[pieceIndex].possibleMoves(
    board,
    { white: { short: false, long: false }, black: { short: false, long: false } },
    { rank: null, file: null },
    false
  );
  moves.forEach((move) => {
    if (boardArr[coordsToIndex(move.rank, move.file)] === enemyPieces[2]) {
      res = true;
      return;
    }
  });
  if (res) return true;
  // #endregion
  // #region bishops
  boardArr[pieceIndex] = new Bishop(indexToCoords(pieceIndex), player);
  moves = boardArr[pieceIndex].possibleMoves(
    board,
    { white: { short: false, long: false }, black: { short: false, long: false } },
    { rank: null, file: null },
    false
  );
  moves.forEach((move) => {
    if (boardArr[coordsToIndex(move.rank, move.file)] === enemyPieces[3]) {
      res = true;
      return;
    }
  });
  if (res) return true;
  // #endregion
  // #region queens
  boardArr[pieceIndex] = new Queen(indexToCoords(pieceIndex), player);
  moves = boardArr[pieceIndex].possibleMoves(
    board,
    { white: { short: false, long: false }, black: { short: false, long: false } },
    { rank: null, file: null },
    false
  );
  moves.forEach((move) => {
    if (boardArr[coordsToIndex(move.rank, move.file)] === enemyPieces[4]) {
      res = true;
      return;
    }
  });
  if (res) return true;
  // #endregion
  // #region kings
  boardArr[pieceIndex] = new King(indexToCoords(pieceIndex), player);
  moves = boardArr[pieceIndex].possibleMoves(
    board,
    { white: { short: false, long: false }, black: { short: false, long: false } },
    { rank: null, file: null },
    false
  );
  moves.forEach((move) => {
    if (boardArr[coordsToIndex(move.rank, move.file)] === enemyPieces[5]) {
      res = true;
      return;
    }
  });
  if (res) return true;
  // #endregion

  return res;
}

function isAmbiguous(board, toCoords, fromCoords, piece) {
  let player = piece.toLowerCase() === piece ? "white" : "black";
  let pieceObj;
  let ret = false;
  switch (piece.toLowerCase()) {
    case "p":
      pieceObj = new Pawn(toCoords, player);
      break;
    case "r":
      pieceObj = new Rook(toCoords, player);
      break;
    case "n":
      pieceObj = new Knight(toCoords, player);
      break;
    case "b":
      pieceObj = new Bishop(toCoords, player);
      break;
    case "q":
      pieceObj = new Queen(toCoords, player);
      break;
    case "k":
      ret = true;
      break;
  }
  if (ret) return false;
  let moves = pieceObj.possibleMoves(board, { white: { short: false, long: false }, black: { short: false, long: false } }, null, true);
  moves = moves.filter((move) => {
    if (board[coordsToIndex(move.rank, move.file)] === piece && !(move.rank === fromCoords.rank && move.file === fromCoords.file)) {
      return true;
    }
  });
  if (moves.length === 0) return false;
  ret = { rank: false, file: false };
  moves.forEach((move) => {
    console.log(move, fromCoords);
    if (move.rank === toCoords.rank) {
      ret.file = true;
    }
    if (move.file === toCoords.file) {
      ret.rank = true;
    }
  });
  if (!ret.rank) ret.file = true;

  return ret;
}

class Game {
  constructor(gameID) {
    this.gameID = gameID; // for storing result of game after it has ended
    // let pos = "8/KPpPpPpP/8/8/8/8/kpPpPpPp/8 w - - 0 0"; // - promotion
    // let pos = "k7/6Q1/2K5/8/7p/7P/1R6/8 w - - 98 0"; // - stalemate / checkmate / fifty move rule
    // let pos = "k7/1q6/1qq5/n6N/1N4n1/5QQ1/6Q1/7K w - - 0 0"; // - disambiguity (with knights)
    // let pos = "r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 0"; // - castling
    let pos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0"; // - regular starting position

    this.paused = false;

    this.history = [
      {
        pos: pos,
        lastMove: null,
      },
    ];

    this.state = {
      moveDisplayed: 0,
      movesCalculated: {},
    };

    this.boardAlphabet = "abcdefgh";

    this.state["pos"] = this.buildPosFromFEN(pos);
    this.state.pos["boardLongNotation"] = this.getLongNotation(this.state.pos.board);
    this.startPieces = this.state.pos.boardLongNotation.split("").filter((string) => string !== " ");

    display(this.state.pos.boardLongNotation);
  }

  attemptMove(from, to) {
    if (this.paused) return;

    let toCoords = indexToCoords(to);
    let fromCoords = indexToCoords(from);
    let move = this.state.movesCalculated[`${from}`].filter((testMove) => {
      return testMove.rank === toCoords.rank && testMove.file === toCoords.file;
    })[0];
    if (move) {
      if (move.special === "short castle onrook") {
        to = to - 1;
        move.special = "short castle";
        toCoords.file--;
      } else if (move.special === "long castle onrook") {
        to = to + 2;
        move.special = "long castle";
        toCoords.file += 2;
      }

      let pieceToMove = this.state.pos.board[from];
      let pieceToCapture = this.state.pos.board[to];
      this.state.pos.board[from] = "";
      pieceToMove.updatePosition(toCoords);
      this.state.pos.board[to] = pieceToMove;
      this.state.movesCalculated = [];
      this.state.pos.enPassant = { rank: null, file: null };

      switch (move.special) {
        case "promotion":
          this.paused = move;
          openPromotionPanel(this.state.pos.player, to);
          break;
        case "double advance":
          if (toCoords.rank === 4) this.state.pos.enPassant = { rank: 3, file: toCoords.file };
          if (toCoords.rank === 5) this.state.pos.enPassant = { rank: 6, file: toCoords.file };
          break;
        case "en passant":
          if (toCoords.rank === 3) this.state.pos.board[to - 8] = "";
          if (toCoords.rank === 6) this.state.pos.board[to + 8] = "";
          break;
        case "short castle":
          this.state.pos.board[from + 1] = this.state.pos.board[from + 3];
          this.state.pos.board[from + 1].updatePosition({ rank: toCoords.rank, file: 6 });
          this.state.pos.board[from + 3] = "";
          break;
        case "long castle":
          this.state.pos.board[from - 1] = this.state.pos.board[from - 4];
          this.state.pos.board[from - 1].updatePosition({ rank: toCoords.rank, file: 4 });
          this.state.pos.board[from - 4] = "";
          break;
      }

      let piece = pieceToMove.getFENNotation();
      if (piece.toLowerCase() === "p" || pieceToCapture !== "") {
        this.state.pos.halfMoves = 0;
      } else {
        this.state.pos.halfMoves++;
      }
      if (piece.toLowerCase() === "r" && fromCoords.file === 8) {
        if (fromCoords.file === 8) this.state.pos.castling[this.state.pos.player].short = false;
        else if (fromCoords.file === 1) this.state.pos.castling[this.state.pos.player].long = false;
      } else if (piece.toLowerCase() === "k") {
        this.state.pos.castling[this.state.pos.player].short = false;
        this.state.pos.castling[this.state.pos.player].long = false;
      }

      if (this.state.pos.player === "white") {
        this.state.pos.player = "black";
      } else {
        this.state.pos.fullMoves++;
        this.state.pos.player = "white";
      }

      move.from = { rank: fromCoords.rank, file: fromCoords.file };
      move.piece = pieceToMove.getFENNotation();

      move.capture = pieceToCapture !== "";

      if (pieceToMove.getFENNotation().toLowerCase() === "p")
        move.disambiguity = { rank: false, file: pieceToCapture !== "" || move.special === "en passant" };
      else move.disambiguity = isAmbiguous(this.state.pos.boardLongNotation, toCoords, fromCoords, pieceToMove.getFENNotation());

      if (this.paused) return true;

      this.state.pos.boardLongNotation = this.getLongNotation(this.state.pos.board);
      display(this.state.pos.boardLongNotation);

      move.check = isInCheck(this.state.pos.boardLongNotation, this.state.pos.player);
      let playerCanMove = false;
      this.state.pos.board.every((spot, index) => {
        if (spot.player === this.state.pos.player) {
          let moves = spot.possibleMoves(this.state.pos.boardLongNotation, this.state.pos.castling, this.state.pos.enPassant, true);
          this.state.movesCalculated[`${index}`] = moves;
          if (moves.length > 0) {
            playerCanMove = true;
            return false;
          }
          return true;
        } else {
          return true;
        }
      });
      if (!playerCanMove) {
        if (move.check) move.checkmate = true;
        else move.stalemate = true;
      }
      if (this.state.pos.halfMoves === 100) {
        move.drawByFifty = true;
      }

      let positionArr = this.buildFENFromPos(this.state.pos).split(" ");
      positionArr.pop();
      positionArr.pop();
      let positionString = positionArr.join(" ");
      let repititions = this.history.filter((historyEl) => {
        let position = historyEl.pos.split(" ");
        position.pop();
        position.pop();
        let string = position.join(" ");
        return string === positionString;
      });

      if (repititions.length === 3) {
        move.drawByRepitition = true;
      }

      if (move.stalemate || move.checkmate || move.drawByFifty || move.drawByRepitition) {
        this.paused = true;
      }

      this.updateHistory(move);

      return true;
    } else {
      return false;
    }
  }
  promoteTo(piece) {
    if (this.paused) {
      let obj;
      let player = piece.toLowerCase() === piece ? "black" : "white";
      switch (piece.toLowerCase()) {
        case "q":
          obj = new Queen(this.paused, player);
          break;
        case "r":
          obj = new Rook(this.paused, player);
          break;
        case "b":
          obj = new Bishop(this.paused, player);
          break;
        case "n":
          obj = new Knight(this.paused, player);
          break;
      }
      this.state.pos.board[coordsToIndex(this.paused.rank, this.paused.file)] = obj;
      closePromotionPanel(player);

      this.state.pos.boardLongNotation = this.getLongNotation(this.state.pos.board);
      display(this.state.pos.boardLongNotation);

      let move = this.paused;
      move.promoteTo = piece.toUpperCase();

      move.check = isInCheck(this.state.pos.boardLongNotation, this.state.pos.player);
      let playerCanMove = false;
      this.state.pos.board.every((spot, index) => {
        if (spot.player === this.state.pos.player) {
          let moves = spot.possibleMoves(this.state.pos.boardLongNotation, this.state.pos.castling, this.state.pos.enPassant, true);
          this.state.movesCalculated[`${index}`] = moves;
          if (moves.length > 0) {
            playerCanMove = true;
            return false;
          }
          return true;
        } else {
          return true;
        }
      });
      if (!playerCanMove) {
        if (move.check) move.checkmate = true;
        else move.stalemate = true;
      }
      if (this.state.pos.halfMoves === 100) {
        move.drawByFifty = true;
      }

      let positionArr = this.buildFENFromPos(this.state.pos).split(" ");
      positionArr.pop();
      positionArr.pop();
      let positionString = positionArr.join(" ");
      let repititions = this.history.filter((historyEl) => {
        let position = historyEl.pos.split(" ");
        position.pop();
        position.pop();
        let string = position.join(" ");
        return string === positionString;
      });

      if (repititions.length === 3) {
        move.drawByRepitition = true;
      }

      if (move.stalemate || move.checkmate || move.drawByFifty || move.drawByRepitition) {
        this.paused = true;
      }

      this.paused = false;

      this.updateHistory(move);
    }
  }

  undoMove() {
    if (this.state.moveDisplayed === 0) return;
    this.displayMove(this.state.moveDisplayed - 1);
  }
  redoMove() {
    if (this.state.moveDisplayed === this.history.length - 1) return;
    this.displayMove(this.state.moveDisplayed + 1);
  }
  displayMove(number) {
    this.state.moveDisplayed = number;
    display(this.getLongNotation(this.buildPosFromFEN(this.history[this.state.moveDisplayed].pos).board));
    displayingMove(this.state.moveDisplayed);
  }
  displayCurrentMove() {
    if (this.state.moveDisplayed === this.history.length - 1) return;
    this.state.moveDisplayed = this.history.length - 1;
    display(this.state.pos.boardLongNotation);
  }
  passHistory() {
    return [...this.history];
  }

  updateHistory(move) {
    this.history.push({ pos: this.buildFENFromPos(this.state.pos), lastMove: move });
    this.state.moveDisplayed = this.history.length - 1;
    updateHistory(move);
    displayingMove(this.history.length - 1);
    this.updateCaptures(this.state.pos.boardLongNotation);
    if (this.paused) this.endGame(move);
  }
  updateCaptures(board) {
    let pieces = board.split("").filter((string) => string !== " ");
    let missing = [
      "r",
      "n",
      "b",
      "q",
      "k",
      "b",
      "n",
      "r",
      "p",
      "p",
      "p",
      "p",
      "p",
      "p",
      "p",
      "p",
      "P",
      "P",
      "P",
      "P",
      "P",
      "P",
      "P",
      "P",
      "R",
      "N",
      "B",
      "Q",
      "K",
      "B",
      "N",
      "R",
    ];
    pieces.forEach((piece) => {
      let index = missing.indexOf(piece);
      if (index === -1) {
        let pawn = piece.toLowerCase() === piece ? "p" : "P";
        index = missing.indexOf(pawn);
      }
      missing.splice(index, 1);
    });
    let whiteMissing = missing.filter((string) => string.toUpperCase() === string);
    let blackMissing = missing.filter((string) => string.toLowerCase() === string);
    updateCaptures(whiteMissing, blackMissing);
  }

  endGame(move) {
    let endedBy;
    let score = { white: 0.5, black: 0.5 };
    if (move.checkmate) {
      endedBy = "checkmate";
      score = { white: 1, black: 1 };
      score[this.state.pos.player] = 0;
    } else if (move.stalemate) {
      endedBy = "stalemate";
    } else if (move.drawByFifty) {
      endedBy = "50-move rule";
    } else if (move.drawByRepitition) {
      endedBy = "threefold repitition";
    }
    gameEnd({ endedBy: endedBy, score: score });
  }

  getMovesOf(index, checkFriendly) {
    if (this.paused) return null;
    if ((checkFriendly && this.state.pos.board[index].player !== this.state.pos.player) || this.state.pos.board[index] === "") {
      return null;
    }
    if (this.state.movesCalculated[`${index}`]) {
      return this.state.movesCalculated[`${index}`];
    }
    let movesArr = this.state.pos.board[index].possibleMoves(
      this.state.pos.boardLongNotation,
      this.state.pos.castling,
      this.state.pos.enPassant,
      true
    );
    movesArr.forEach((move) => {
      if (move.special === "short castle") {
        movesArr.push({ rank: move.rank, file: move.file + 1, special: "short castle onrook" });
      } else if (move.special === "long castle") {
        movesArr.push({ rank: move.rank, file: move.file - 2, special: "long castle onrook" });
      }
    });
    this.state.movesCalculated[`${index}`] = movesArr;

    return movesArr;
  }

  buildPosFromFEN(fen) {
    let elements = fen.split(" ");
    let position = {};

    // build board from fen
    let posFromFEN = elements[0];
    posFromFEN = posFromFEN.replace(/\//g, "");
    let board = [];
    let index = 0;
    for (let i = 0; i < posFromFEN.length; i++) {
      let not = posFromFEN[i];
      if (parseInt(not)) {
        board = [...board, ...Array(parseInt(not)).fill("")];
        index += parseInt(not);
      } else {
        let player = not.toLowerCase() === not ? "black" : "white";
        let piecePos = indexToCoords(index);
        switch (not.toLowerCase()) {
          case "p":
            board.push(new Pawn(piecePos, player));
            break;
          case "n":
            board.push(new Knight(piecePos, player));
            break;
          case "k":
            board.push(new King(piecePos, player));
            break;
          case "r":
            board.push(new Rook(piecePos, player));
            break;
          case "b":
            board.push(new Bishop(piecePos, player));
            break;
          case "q":
            board.push(new Queen(piecePos, player));
            break;
          default:
            board.push("");
            break;
        }
        index++;
      }
    }
    position["board"] = board;

    position["player"] = elements[1] === "w" ? "white" : "black";

    let castling = {
      white: { short: elements[2].includes("K"), long: elements[2].includes("Q") },
      black: { short: elements[2].includes("k"), long: elements[2].includes("q") },
    };
    position["castling"] = castling;

    let enPassant = { rank: null, file: null };
    if (elements[3] !== "-") {
      let file = elements[3].substring(0, 1);
      file = this.fileNum(file);
      let rank = parseInt(elements[3].substring(1, 2));
      enPassant.rank = rank;
      enPassant.file = file;
    }
    position["enPassant"] = enPassant;

    position["halfMoves"] = parseInt(elements[4]);
    position["fullMoves"] = parseInt(elements[5]);

    return position;
  }
  buildFENFromPos(pos) {
    let fen = "";

    // board
    let board = pos.board;
    let counter = 0;
    board.forEach((spot, index) => {
      if (index % 8 === 0 && index !== 0) {
        if (counter > 0) {
          fen += counter;
          counter = 0;
        }
        fen += "/";
      }
      if (spot === "") {
        counter++;
        if (index === 63) {
          fen += counter;
        }
      } else {
        if (counter > 0) {
          fen += counter;
          counter = 0;
        }
        fen += spot.getFENNotation();
      }
    });

    // player
    if (pos.player === "white") {
      fen += " w";
    } else {
      fen += " b";
    }

    fen += " ";

    // castling rights
    let anyCastle = false;
    if (pos.castling.white.short) {
      fen += "K";
      anyCastle = true;
    }
    if (pos.castling.white.long) {
      fen += "Q";
      anyCastle = true;
    }
    if (pos.castling.black.short) {
      fen += "k";
      anyCastle = true;
    }
    if (pos.castling.black.long) {
      fen += "q";
      anyCastle = true;
    }
    if (!anyCastle) {
      fen += "-";
    }

    // en passant
    if (pos.enPassant.rank) {
      fen += " " + this.fileLetter(pos.enPassant.file) + pos.enPassant.rank;
    } else {
      fen += " -";
    }

    fen += " " + pos.halfMoves;
    fen += " " + pos.fullMoves;

    return fen;
  }

  getLongNotation(board) {
    let longNotation = "";
    board.forEach((spot) => {
      if (spot === "") {
        longNotation += " ";
      } else {
        longNotation += spot.getFENNotation();
      }
    });
    return longNotation;
  }

  getPieceAt(rank, file) {
    if (this.outOfBounds(rank, file)) return 0;
    return this.state.pos.board[coordsToIndex(rank, file)];
  }
  setPieceAt(rank, file, piece = " ") {
    if (this.outOfBounds(rank, file)) return 0;
    let prevPiece = this.getPieceAt(rank, file);
    let temp = this.state.pos.board.split("");
    temp[coordsToIndex(rank, file)] = piece;
    this.state.pos.board = temp.join("");
    return prevPiece;
  }
  fileLetter(fileInNum) {
    if (this.outOfBounds(1, fileInNum)) return false;
    return this.boardAlphabet[fileInNum - 1];
  }
  fileNum(fileInLett) {
    let ret = this.boardAlphabet.indexOf(fileInLett) + 1;
    if (ret === 0) return false;
    return ret;
  }
  outOfBounds(rank, file) {
    if (rank < 1 || rank > 8 || file < 1 || file > 8) return true;
  }
}
