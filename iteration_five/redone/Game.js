class Game {
  constructor(whitePlayer, blackPlayer, gameID, elements) {
    this.gameInfo = {
      whitePlayer: whitePlayer,
      blackPlayer: blackPlayer,
      gameID: gameID,
    };
    this.elements = elements;
    console.log(this.elements);

    this.history = [
      {
        pos: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0",
        lastMove: null,
      },
    ];
    this.state = {
      pos: [
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
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "P",
        "P",
        "P",
        "P",
        "P",
        "R",
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
      ],
      // any position of x rank and y file is at index ((Math.abs(x - 8) * 8) + (y - 1));
      currPlayer: "white",
      lastMove: null,
      castlingRights: {
        whiteShort: true,
        whiteLong: true,
        blackShort: true,
        whiteShort: true,
      },
      enPassantSqaure: null,
      halfMoves: 0, // Moves since last a) pawn move, or b) capture ;; if reaches 100 (50 moves for each player), game ends in draw by 50-move rule
      fullMoves: 0, // White and black have both moved ;; incremented after black move
    };
    this.boardAlphabet = "abcdefgh";
  }

  // some utility functions
  getPieceAt(rank, file) {
    if (outOfBounds(rank, file)) return 0;

    return curPos[Math.abs(rank - 8) * 8 + (file - 1)];
  }
  setPieceAt(rank, file, piece = "") {
    if (outOfBounds(rank, file)) return 0;

    let prevPiece = getPieceAt(rank, file);
    curPos[Math.abs(rank - 8) * 8 + (file - 1)] = piece;
    return prevPiece;
  }
  fileLetter(fileInNum) {
    if (outOfBounds(2, fileInNum)) return false;
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
