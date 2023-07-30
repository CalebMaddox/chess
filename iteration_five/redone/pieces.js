function checkSequentialMove(boardFriendlyString, rank, file) {
  let friendlyValue = boardFriendlyString[coordsToIndex(rank, file)];
  let cont = true;
  let push = null;
  switch (friendlyValue) {
    case "1":
      cont = false;
      break;
    case "0":
      push = { rank: rank, file: file };
      cont = false;
      break;
    default:
      push = { rank: rank, file: file };
      break;
  }
  return { cont: cont, push: push };
}

class Pawn {
  constructor(position, player) {
    this.rank = position.rank;
    this.file = position.file;
    this.positionIndex = coordsToIndex(this.rank, this.file);

    this.player = player;
  }

  possibleMoves(board, castlingRights, enPassant, checkChecks) {
    let boardArr = board.split("");
    boardArr = boardArr.map((spot) => {
      if (spot === " ") return " ";
      return (this.player === "black" && spot.toLowerCase() === spot) || (this.player === "white" && spot.toUpperCase() === spot) ? "1" : "0";
    });
    let boardFriendlyString = boardArr.join("");

    let rankMultiplier = 1;
    if (this.player === "black") {
      rankMultiplier = -1;
    }
    let destination = { rank: this.rank, file: this.file };
    let possibleForPiece = [];

    // 1 space forward
    destination.rank = destination.rank + 1 * rankMultiplier;
    // destination.rank = this.rank;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] === " ") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });

      // 2 spaces forward (2 spaces cannot work if 1 space cannot)
      if ((this.rank === 2 && this.player === "white") || (this.rank === 7 && this.player === "black")) {
        destination.rank = destination.rank + 1 * rankMultiplier;
        if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] === " ") {
          possibleForPiece.push({ rank: destination.rank, file: destination.file, special: "double advance" });
        }
      }
    }

    // capturing
    destination.rank = this.rank + 1 * rankMultiplier;
    destination.file = this.file + 1;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] === "0") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    } else if (enPassant.rank === destination.rank && enPassant.file === destination.file) {
      possibleForPiece.push({ rank: destination.rank, file: destination.file, special: "en passant" });
    }
    destination.file = this.file - 1;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] === "0") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    } else if (enPassant.rank === destination.rank && enPassant.file === destination.file) {
      possibleForPiece.push({ rank: destination.rank, file: destination.file, special: "en passant" });
    }

    possibleForPiece.forEach((move) => {
      if (move.rank === 8 || move.rank === 1) {
        move.special = "promotion";
      }
    });

    possibleForPiece = possibleForPiece.filter((move) => {
      return !(move.rank < 1 || move.rank > 8 || move.file < 1 || move.file > 8);
    });
    if (checkChecks && possibleForPiece.length > 0) {
      let tempBoard = board;
      tempBoard = tempBoard.substring(0, this.positionIndex) + " " + tempBoard.substring(this.positionIndex + 1);
      possibleForPiece = possibleForPiece.filter((move) => {
        let moveToIndex = coordsToIndex(move.rank, move.file);
        let boardToPass = tempBoard.substring(0, moveToIndex) + (this.player === "white" ? "P" : "p") + tempBoard.substring(moveToIndex + 1);
        if (move.special === "en passant") {
          let enPassantIndex = coordsToIndex(move.rank + -1 * rankMultiplier, move.file);
          boardToPass = boardToPass.substring(0, enPassantIndex) + " " + boardToPass.substring(enPassantIndex + 1);
        }
        return !isInCheck(boardToPass, this.player);
      });
    }

    return possibleForPiece;
  }

  getLongPieceNotation() {
    return this.player === "white" ? "wp" : "bp";
  }
  getFENNotation() {
    return this.player === "white" ? "P" : "p";
  }
  getPosition() {
    return { rank: this.rank, file: this.file };
  }
  updatePosition(position) {
    let old = { rank: this.rank, file: this.file };
    this.rank = position.rank;
    this.file = position.file;
    this.positionIndex = coordsToIndex(this.rank, this.file);
    return old;
  }
}
class Knight {
  constructor(position, player) {
    this.rank = position.rank;
    this.file = position.file;
    this.positionIndex = coordsToIndex(this.rank, this.file);

    this.player = player;
  }

  possibleMoves(board, castlingRights, enPassant, checkChecks) {
    let boardArr = board.split("");
    boardArr = boardArr.map((spot) => {
      if (spot === " ") return " ";
      return (this.player === "black" && spot.toLowerCase() === spot) || (this.player === "white" && spot.toUpperCase() === spot) ? "1" : "0";
    });
    let boardFriendlyString = boardArr.join("");

    let destination = { rank: this.rank, file: this.file };
    let possibleForPiece = [];
    // 2 up
    destination.rank += 2;
    destination.file++;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    destination.file -= 2;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    // 2 down
    destination.rank -= 4;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    destination.file += 2;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    // 2 right
    destination.file++;
    destination.rank++;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    destination.rank += 2;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    // 2 left
    destination.file -= 4;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    destination.rank -= 2;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }

    possibleForPiece = possibleForPiece.filter((move) => {
      return !(move.rank < 1 || move.rank > 8 || move.file < 1 || move.file > 8);
    });
    if (checkChecks && possibleForPiece.length > 0) {
      let tempBoard = board;
      tempBoard = tempBoard.substring(0, this.positionIndex) + " " + tempBoard.substring(this.positionIndex + 1);
      possibleForPiece = possibleForPiece.filter((move) => {
        let moveToIndex = coordsToIndex(move.rank, move.file);
        let boardToPass = tempBoard.substring(0, moveToIndex) + (this.player === "white" ? "N" : "n") + tempBoard.substring(moveToIndex + 1);
        return !isInCheck(boardToPass, this.player);
      });
    }

    return possibleForPiece;
  }

  getLongPieceNotation() {
    return this.player === "white" ? "wn" : "bn";
  }
  getFENNotation() {
    return this.player === "white" ? "N" : "n";
  }
  getPosition() {
    return { rank: this.rank, file: this.file };
  }
  updatePosition(position) {
    let old = { rank: this.rank, file: this.file };
    this.rank = position.rank;
    this.file = position.file;
    this.positionIndex = coordsToIndex(this.rank, this.file);
    return old;
  }
}
class King {
  constructor(position, player) {
    this.rank = position.rank;
    this.file = position.file;
    this.positionIndex = coordsToIndex(this.rank, this.file);

    this.player = player;
  }

  possibleMoves(board, castlingRights, enPassant, checkChecks) {
    let boardArr = board.split("");
    boardArr = boardArr.map((spot) => {
      if (spot === " ") return " ";
      return (this.player === "black" && spot.toLowerCase() === spot) || (this.player === "white" && spot.toUpperCase() === spot) ? "1" : "0";
    });
    let boardFriendlyString = boardArr.join("");

    let destination = { rank: this.rank, file: this.file };
    let possibleForPiece = [];
    destination.rank++;
    destination.file--;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    destination.file++;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    destination.file++;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    destination.rank--;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    destination.rank--;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    destination.file--;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    destination.file--;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    destination.rank++;
    if (boardFriendlyString[coordsToIndex(destination.rank, destination.file)] !== "1") {
      possibleForPiece.push({ rank: destination.rank, file: destination.file });
    }
    // castling
    if (checkChecks && !isInCheck(board, this.player)) {
      let rookNot = this.player === "white" ? "R" : "r";
      if (
        castlingRights[this.player].short &&
        board[coordsToIndex(this.rank, 8)] === rookNot &&
        board[coordsToIndex(this.rank, 7)] === " " &&
        board[coordsToIndex(this.rank, 6)] === " " &&
        !isAttacked(coordsToIndex(this.rank, 6), board, this.player)
      ) {
        possibleForPiece.push({ rank: this.rank, file: 7, special: "short castle" });
      }
      if (
        castlingRights[this.player].long &&
        board[coordsToIndex(this.rank, 1)] === rookNot &&
        board[coordsToIndex(this.rank, 2)] === " " &&
        board[coordsToIndex(this.rank, 3)] === " " &&
        board[coordsToIndex(this.rank, 4)] === " " &&
        !isAttacked(coordsToIndex(this.rank, 4), board, this.player)
      ) {
        possibleForPiece.push({ rank: this.rank, file: 3, special: "long castle" });
      }
    }

    possibleForPiece = possibleForPiece.filter((move) => {
      return !(move.rank < 1 || move.rank > 8 || move.file < 1 || move.file > 8);
    });
    if (checkChecks && possibleForPiece.length > 0) {
      let tempBoard = board;
      tempBoard = tempBoard.substring(0, this.positionIndex) + " " + tempBoard.substring(this.positionIndex + 1);
      possibleForPiece = possibleForPiece.filter((move) => {
        let moveToIndex = coordsToIndex(move.rank, move.file);
        let boardToPass = tempBoard.substring(0, moveToIndex) + (this.player === "white" ? "K" : "k") + tempBoard.substring(moveToIndex + 1);
        return !isInCheck(boardToPass, this.player);
      });
    }

    return possibleForPiece;
  }

  getLongPieceNotation() {
    return this.player === "white" ? "wk" : "bk";
  }
  getFENNotation() {
    return this.player === "white" ? "K" : "k";
  }
  getPosition() {
    return { rank: this.rank, file: this.file };
  }
  updatePosition(position) {
    let old = { rank: this.rank, file: this.file };
    this.rank = position.rank;
    this.file = position.file;
    this.positionIndex = coordsToIndex(this.rank, this.file);
    return old;
  }
}
class Rook {
  constructor(position, player) {
    this.rank = position.rank;
    this.file = position.file;
    this.positionIndex = coordsToIndex(this.rank, this.file);

    this.player = player;
  }

  possibleMoves(board, castlingRights, enPassant, checkChecks) {
    let boardArr = board.split("");
    boardArr = boardArr.map((spot) => {
      if (spot === " ") return " ";
      return (this.player === "black" && spot.toLowerCase() === spot) || (this.player === "white" && spot.toUpperCase() === spot) ? "1" : "0";
    });
    let boardFriendlyString = boardArr.join("");

    let destination = { rank: this.rank, file: this.file };
    let possibleForPiece = [];

    // to right
    let cont = true;
    while (cont) {
      destination.file++;
      if (destination.file > 8) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) {
          possibleForPiece.push(res.push);
        }
      }
    }
    // to left
    cont = true;
    destination.file = this.file;
    while (cont) {
      destination.file--;
      if (destination.file < 1) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) {
          possibleForPiece.push(res.push);
        }
      }
    }
    // to top
    cont = true;
    destination.file = this.file;
    while (cont) {
      destination.rank++;
      if (destination.rank > 8) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) {
          possibleForPiece.push(res.push);
        }
      }
    }
    // to bottom
    cont = true;
    destination.rank = this.rank;
    while (cont) {
      destination.rank--;
      if (destination.rank < 1) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) {
          possibleForPiece.push(res.push);
        }
      }
    }

    if (checkChecks && possibleForPiece.length > 0) {
      let tempBoard = board;
      tempBoard = tempBoard.substring(0, this.positionIndex) + " " + tempBoard.substring(this.positionIndex + 1);
      possibleForPiece = possibleForPiece.filter((move) => {
        let moveToIndex = coordsToIndex(move.rank, move.file);
        let boardToPass = tempBoard.substring(0, moveToIndex) + (this.player === "white" ? "R" : "r") + tempBoard.substring(moveToIndex + 1);
        return !isInCheck(boardToPass, this.player);
      });
    }

    return possibleForPiece;
  }

  getLongPieceNotation() {
    return this.player === "white" ? "wr" : "br";
  }
  getFENNotation() {
    return this.player === "white" ? "R" : "r";
  }
  getPosition() {
    return { rank: this.rank, file: this.file };
  }
  updatePosition(position) {
    let old = { rank: this.rank, file: this.file };
    this.rank = position.rank;
    this.file = position.file;
    this.positionIndex = coordsToIndex(this.rank, this.file);
    return old;
  }
}
class Bishop {
  constructor(position, player) {
    this.rank = position.rank;
    this.file = position.file;
    this.positionIndex = coordsToIndex(this.rank, this.file);

    this.player = player;
  }

  possibleMoves(board, castlingRights, enPassant, checkChecks) {
    let boardArr = board.split("");
    boardArr = boardArr.map((spot) => {
      if (spot === " ") return " ";
      return (this.player === "black" && spot.toLowerCase() === spot) || (this.player === "white" && spot.toUpperCase() === spot) ? "1" : "0";
    });
    let boardFriendlyString = boardArr.join("");

    let destination = { rank: this.rank, file: this.file };
    let possibleForPiece = [];

    // to top right
    let cont = true;
    while (cont) {
      destination.file++;
      destination.rank++;
      if (destination.rank > 8 || destination.file > 8) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) possibleForPiece.push(res.push);
      }
    }
    // to bottom right
    destination = { rank: this.rank, file: this.file };
    cont = true;
    while (cont) {
      destination.file++;
      destination.rank--;
      if (destination.rank < 1 || destination.file > 8) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) possibleForPiece.push(res.push);
      }
    }
    // to top left
    destination = { rank: this.rank, file: this.file };
    cont = true;
    while (cont) {
      destination.file--;
      destination.rank++;
      if (destination.rank > 8 || destination.file < 1) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) possibleForPiece.push(res.push);
      }
    }
    // to bottom left
    destination = { rank: this.rank, file: this.file };
    cont = true;
    while (cont) {
      destination.file--;
      destination.rank--;
      if (destination.rank < 1 || destination.file < 1) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) possibleForPiece.push(res.push);
      }
    }

    if (checkChecks && possibleForPiece.length > 0) {
      let tempBoard = board;
      tempBoard = tempBoard.substring(0, this.positionIndex) + " " + tempBoard.substring(this.positionIndex + 1);
      possibleForPiece = possibleForPiece.filter((move) => {
        let moveToIndex = coordsToIndex(move.rank, move.file);
        let boardToPass = tempBoard.substring(0, moveToIndex) + (this.player === "white" ? "B" : "b") + tempBoard.substring(moveToIndex + 1);
        return !isInCheck(boardToPass, this.player);
      });
    }

    return possibleForPiece;
  }

  getLongPieceNotation() {
    return this.player === "white" ? "wb" : "bb";
  }
  getFENNotation() {
    return this.player === "white" ? "B" : "b";
  }
  getPosition() {
    return { rank: this.rank, file: this.file };
  }
  updatePosition(position) {
    let old = { rank: this.rank, file: this.file };
    this.rank = position.rank;
    this.file = position.file;
    this.positionIndex = coordsToIndex(this.rank, this.file);
    return old;
  }
}
class Queen {
  constructor(position, player) {
    this.rank = position.rank;
    this.file = position.file;
    this.positionIndex = coordsToIndex(this.rank, this.file);

    this.player = player;
  }

  possibleMoves(board, castlingRights, enPassant, checkChecks) {
    let boardArr = board.split("");
    boardArr = boardArr.map((spot) => {
      if (spot === " ") return " ";
      return (this.player === "black" && spot.toLowerCase() === spot) || (this.player === "white" && spot.toUpperCase() === spot) ? "1" : "0";
    });
    let boardFriendlyString = boardArr.join("");

    let destination = { rank: this.rank, file: this.file };
    let possibleForPiece = [];

    // to top right
    let cont = true;
    while (cont) {
      destination.file++;
      destination.rank++;
      if (destination.rank > 8 || destination.file > 8) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) possibleForPiece.push(res.push);
      }
    }
    // to bottom right
    destination = { rank: this.rank, file: this.file };
    cont = true;
    while (cont) {
      destination.file++;
      destination.rank--;
      if (destination.rank < 1 || destination.file > 8) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) possibleForPiece.push(res.push);
      }
    }
    // to top left
    destination = { rank: this.rank, file: this.file };
    cont = true;
    while (cont) {
      destination.file--;
      destination.rank++;
      if (destination.rank > 8 || destination.file < 1) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) possibleForPiece.push(res.push);
      }
    }
    // to bottom left
    destination = { rank: this.rank, file: this.file };
    cont = true;
    while (cont) {
      destination.file--;
      destination.rank--;
      if (destination.rank < 1 || destination.file < 1) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) possibleForPiece.push(res.push);
      }
    }
    // to right
    cont = true;
    destination = { rank: this.rank, file: this.file };
    while (cont) {
      destination.file++;
      if (destination.file > 8) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) {
          possibleForPiece.push(res.push);
        }
      }
    }
    // to left
    cont = true;
    destination.file = this.file;
    while (cont) {
      destination.file--;
      if (destination.file < 1) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) {
          possibleForPiece.push(res.push);
        }
      }
    }
    // to top
    cont = true;
    destination.file = this.file;
    while (cont) {
      destination.rank++;
      if (destination.rank > 8) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) {
          possibleForPiece.push(res.push);
        }
      }
    }
    // to bottom
    cont = true;
    destination.rank = this.rank;
    while (cont) {
      destination.rank--;
      if (destination.rank < 1) {
        cont = false;
      } else {
        let res = checkSequentialMove(boardFriendlyString, destination.rank, destination.file);
        cont = res.cont;
        if (res.push) {
          possibleForPiece.push(res.push);
        }
      }
    }

    if (checkChecks && possibleForPiece.length > 0) {
      let tempBoard = board;
      tempBoard = tempBoard.substring(0, this.positionIndex) + " " + tempBoard.substring(this.positionIndex + 1);
      possibleForPiece = possibleForPiece.filter((move) => {
        let moveToIndex = coordsToIndex(move.rank, move.file);
        let boardToPass = tempBoard.substring(0, moveToIndex) + (this.player === "white" ? "Q" : "q") + tempBoard.substring(moveToIndex + 1);
        return !isInCheck(boardToPass, this.player);
      });
    }

    return possibleForPiece;
  }

  getLongPieceNotation() {
    return this.player === "white" ? "wq" : "bq";
  }
  getFENNotation() {
    return this.player === "white" ? "Q" : "q";
  }
  getPosition() {
    return { rank: this.rank, file: this.file };
  }
  updatePosition(position) {
    let old = { rank: this.rank, file: this.file };
    this.rank = position.rank;
    this.file = position.file;
    this.positionIndex = coordsToIndex(this.rank, this.file);
    return old;
  }
}
