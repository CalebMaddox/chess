// #region settings

var settings = {
  pieceStyle: "neo",
};

// #endregion

// All pieces, including custom

var pieces = {
  w_pawn: {
    displayImage: `assets/pieces/${settings.pieceStyle}/w_pawn`,
    value: 1,
    moves: [
      { pattern: "0 1", conditions: "not capture" },
      { pattern: "1 1", conditions: "capture" },
      { pattern: "-1 1", conditions: "capture" },
      { pattern: "1 1", conditions: "en_passant" },
      { pattern: "-1 1", conditions: "en_passant" },
      { pattern: "0 2", conditions: "on y:2,not capture,empty y:3" },
    ],
  },
  b_pawn: {
    displayImage: `assets/pieces/${settings.pieceStyle}/b_pawn`,
    value: -1,
    moves: [
      { pattern: "0 -1", conditions: "not capture" },
      { pattern: "1 -1", conditions: "capture" },
      { pattern: "-1 -1", conditions: "capture" },
      { pattern: "1 -1", conditions: "en_passant" },
      { pattern: "-1 -1", conditions: "en_passant" },
      { pattern: "0 -2", conditions: "on y:7,not capture,empty y:6" },
    ],
  },
  w_rook: {
    displayImage: `assets/pieces/${settings.pieceStyle}/w_rook`,
    value: 5,
    moves: [
      { pattern: "0 +", conditions: "" },
      { pattern: "0 -", conditions: "" },
      { pattern: "+ 0", conditions: "" },
      { pattern: "- 0", conditions: "" },
    ],
  },
  b_rook: {
    displayImage: `assets/pieces/${settings.pieceStyle}/b_rook`,
    value: -5,
    moves: [
      { pattern: "0 +", conditions: "" },
      { pattern: "0 -", conditions: "" },
      { pattern: "+ 0", conditions: "" },
      { pattern: "- 0", conditions: "" },
    ],
  },
  w_knight: {
    displayImage: `assets/pieces/${settings.pieceStyle}/w_knight`,
    value: 3,
    moves: [
      { pattern: "1 2", conditions: "" },
      { pattern: "-1 2", conditions: "" },
      { pattern: "1 -2", conditions: "" },
      { pattern: "-1 -2", conditions: "" },
      { pattern: "2 1", conditions: "" },
      { pattern: "-2 1", conditions: "" },
      { pattern: "2 -1", conditions: "" },
      { pattern: "-2 -1", conditions: "" },
    ],
  },
  b_knight: {
    displayImage: `assets/pieces/${settings.pieceStyle}/b_knight`,
    value: -3,
    moves: [
      { pattern: "1 2", conditions: "" },
      { pattern: "-1 2", conditions: "" },
      { pattern: "1 -2", conditions: "" },
      { pattern: "-1 -2", conditions: "" },
      { pattern: "2 1", conditions: "" },
      { pattern: "-2 1", conditions: "" },
      { pattern: "2 -1", conditions: "" },
      { pattern: "-2 -1", conditions: "" },
    ],
  },
  w_bishop: {
    displayImage: `assets/pieces/${settings.pieceStyle}/w_bishop`,
    value: 3,
    moves: [
      { pattern: "+ +", conditions: "" },
      { pattern: "+ -", conditions: "" },
      { pattern: "- +", conditions: "" },
      { pattern: "- -", conditions: "" },
    ],
  },
  b_bishop: {
    displayImage: `assets/pieces/${settings.pieceStyle}/b_bishop`,
    value: -3,
    moves: [
      { pattern: "+ +", conditions: "" },
      { pattern: "+ -", conditions: "" },
      { pattern: "- +", conditions: "" },
      { pattern: "- -", conditions: "" },
    ],
  },
  w_queen: {
    displayImage: `assets/pieces/${settings.pieceStyle}/w_queen`,
    value: 9,
    moves: [
      { pattern: "+ +", conditions: "" },
      { pattern: "+ -", conditions: "" },
      { pattern: "- +", conditions: "" },
      { pattern: "- -", conditions: "" },
      { pattern: "0 +", conditions: "" },
      { pattern: "0 -", conditions: "" },
      { pattern: "+ 0", conditions: "" },
      { pattern: "- 0", conditions: "" },
    ],
  },
  b_queen: {
    displayImage: `assets/pieces/${settings.pieceStyle}/b_queen`,
    value: -9,
    moves: [
      { pattern: "+ +", conditions: "" },
      { pattern: "+ -", conditions: "" },
      { pattern: "- +", conditions: "" },
      { pattern: "- -", conditions: "" },
      { pattern: "0 +", conditions: "" },
      { pattern: "0 -", conditions: "" },
      { pattern: "+ 0", conditions: "" },
      { pattern: "- 0", conditions: "" },
    ],
  },
  w_king: {
    displayImage: `assets/pieces/${settings.pieceStyle}/w_king`,
    value: 0,
    moves: [
      { pattern: "1 0", conditions: "" },
      { pattern: "1 1", conditions: "" },
      { pattern: "0 1", conditions: "" },
      { pattern: "-1 1", conditions: "" },
      { pattern: "-1 0", conditions: "" },
      { pattern: "-1 -1", conditions: "" },
      { pattern: "0 -1", conditions: "" },
      { pattern: "1 -1", conditions: "" },
      {
        pattern: "2 0",
        conditions:
          "castle-short,empty x:6,empty x:7,notAttacked x:5,notAttacked x:6,rook x:8",
      },
      {
        pattern: "-2 0",
        conditions: "castle-long,empty x:2,empty x:3,empty x:4,rook x:1",
      },
    ],
  },
  b_king: {
    displayImage: `assets/pieces/${settings.pieceStyle}/b_king`,
    value: 0,
    moves: [
      { pattern: "1 0", conditions: "" },
      { pattern: "1 1", conditions: "" },
      { pattern: "0 1", conditions: "" },
      { pattern: "-1 1", conditions: "" },
      { pattern: "-1 0", conditions: "" },
      { pattern: "-1 -1", conditions: "" },
      { pattern: "0 -1", conditions: "" },
      { pattern: "1 -1", conditions: "" },
      {
        pattern: "2 0",
        conditions:
          "castle-short,empty x:6,empty x:7,notAttacked x:5,notAttacked x:6,rook x:8",
      },
      {
        pattern: "-2 0",
        conditions: "castle-long,empty x:2,empty x:3,empty x:4,rook x:1",
      },
    ],
  },
};

// #endregion
