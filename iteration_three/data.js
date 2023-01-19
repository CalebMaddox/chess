var spots = [
  //#region 1
  { possibleMoves: [], pos: "11", piece: "w_rook" },
  { possibleMoves: [], pos: "12", piece: "w_knight" },
  { possibleMoves: [], pos: "13", piece: "w_bishop" },
  { possibleMoves: [], pos: "14", piece: "w_queen" },
  { possibleMoves: [], pos: "15", piece: "w_king" },
  { possibleMoves: [], pos: "16", piece: "w_bishop" },
  { possibleMoves: [], pos: "17", piece: "w_knight" },
  { possibleMoves: [], pos: "18", piece: "w_rook" },
  //#endregion

  //#region 2
  { possibleMoves: [], pos: "21", piece: "w_pawn" },
  { possibleMoves: [], pos: "22", piece: "w_pawn" },
  { possibleMoves: [], pos: "23", piece: "w_pawn" },
  { possibleMoves: [], pos: "24", piece: "w_pawn" },
  { possibleMoves: [], pos: "25", piece: "w_pawn" },
  { possibleMoves: [], pos: "26", piece: "w_pawn" },
  { possibleMoves: [], pos: "27", piece: "w_pawn" },
  { possibleMoves: [], pos: "28", piece: "w_pawn" },
  //#endregion

  //#region 3
  { possibleMoves: [], pos: "31", piece: "" },
  { possibleMoves: [], pos: "32", piece: "" },
  { possibleMoves: [], pos: "33", piece: "" },
  { possibleMoves: [], pos: "34", piece: "" },
  { possibleMoves: [], pos: "35", piece: "" },
  { possibleMoves: [], pos: "36", piece: "" },
  { possibleMoves: [], pos: "37", piece: "" },
  { possibleMoves: [], pos: "38", piece: "" },
  //#endregion

  //#region 4
  { possibleMoves: [], pos: "41", piece: "" },
  { possibleMoves: [], pos: "42", piece: "" },
  { possibleMoves: [], pos: "43", piece: "" },
  { possibleMoves: [], pos: "44", piece: "" },
  { possibleMoves: [], pos: "45", piece: "" },
  { possibleMoves: [], pos: "46", piece: "" },
  { possibleMoves: [], pos: "47", piece: "" },
  { possibleMoves: [], pos: "48", piece: "" },
  //#endregion

  //#region 5
  { possibleMoves: [], pos: "51", piece: "" },
  { possibleMoves: [], pos: "52", piece: "" },
  { possibleMoves: [], pos: "53", piece: "" },
  { possibleMoves: [], pos: "54", piece: "" },
  { possibleMoves: [], pos: "55", piece: "" },
  { possibleMoves: [], pos: "56", piece: "" },
  { possibleMoves: [], pos: "57", piece: "" },
  { possibleMoves: [], pos: "58", piece: "" },
  //#endregion

  //#region 6
  { possibleMoves: [], pos: "61", piece: "" },
  { possibleMoves: [], pos: "62", piece: "" },
  { possibleMoves: [], pos: "63", piece: "" },
  { possibleMoves: [], pos: "64", piece: "" },
  { possibleMoves: [], pos: "65", piece: "" },
  { possibleMoves: [], pos: "66", piece: "" },
  { possibleMoves: [], pos: "67", piece: "" },
  { possibleMoves: [], pos: "68", piece: "" },
  //#endregion

  //#region 7
  { possibleMoves: [], pos: "71", piece: "b_pawn" },
  { possibleMoves: [], pos: "72", piece: "b_pawn" },
  { possibleMoves: [], pos: "73", piece: "b_pawn" },
  { possibleMoves: [], pos: "74", piece: "b_pawn" },
  { possibleMoves: [], pos: "75", piece: "b_pawn" },
  { possibleMoves: [], pos: "76", piece: "b_pawn" },
  { possibleMoves: [], pos: "77", piece: "b_pawn" },
  { possibleMoves: [], pos: "78", piece: "b_pawn" },
  //#endregion

  //#region 8
  { possibleMoves: [], pos: "81", piece: "b_rook" },
  { possibleMoves: [], pos: "82", piece: "b_knight" },
  { possibleMoves: [], pos: "83", piece: "b_bishop" },
  { possibleMoves: [], pos: "84", piece: "b_queen" },
  { possibleMoves: [], pos: "85", piece: "b_king" },
  { possibleMoves: [], pos: "86", piece: "b_bishop" },
  { possibleMoves: [], pos: "87", piece: "b_knight" },
  { possibleMoves: [], pos: "88", piece: "b_rook" },
  //#endregion
];

// var spots = [
//   { possibleMoves: [], pos: "11", piece: "" },
//   { possibleMoves: [], pos: "12", piece: "" },
//   { possibleMoves: [], pos: "13", piece: "" },
//   { possibleMoves: [], pos: "14", piece: "" },
//   { possibleMoves: [], pos: "15", piece: "w_king" },
//   { possibleMoves: [], pos: "16", piece: "" },
//   { possibleMoves: [], pos: "17", piece: "" },
//   { possibleMoves: [], pos: "18", piece: "w_rook" },
//   { possibleMoves: [], pos: "21", piece: "" },
//   { possibleMoves: [], pos: "22", piece: "" },
//   { possibleMoves: [], pos: "23", piece: "" },
//   { possibleMoves: [], pos: "24", piece: "" },
//   { possibleMoves: [], pos: "25", piece: "" },
//   { possibleMoves: [], pos: "26", piece: "" },
//   { possibleMoves: [], pos: "27", piece: "" },
//   { possibleMoves: [], pos: "28", piece: "" },
//   { possibleMoves: [], pos: "31", piece: "" },
//   { possibleMoves: [], pos: "32", piece: "" },
//   { possibleMoves: [], pos: "33", piece: "" },
//   { possibleMoves: [], pos: "34", piece: "" },
//   { possibleMoves: [], pos: "35", piece: "" },
//   { possibleMoves: [], pos: "36", piece: "" },
//   { possibleMoves: [], pos: "37", piece: "" },
//   { possibleMoves: [], pos: "38", piece: "" },
//   { possibleMoves: [], pos: "41", piece: "" },
//   { possibleMoves: [], pos: "42", piece: "" },
//   { possibleMoves: [], pos: "43", piece: "" },
//   { possibleMoves: [], pos: "44", piece: "" },
//   { possibleMoves: [], pos: "45", piece: "" },
//   { possibleMoves: [], pos: "46", piece: "" },
//   { possibleMoves: [], pos: "47", piece: "" },
//   { possibleMoves: [], pos: "48", piece: "" },
//   { possibleMoves: [], pos: "51", piece: "" },
//   { possibleMoves: [], pos: "52", piece: "b_bishop" },
//   { possibleMoves: [], pos: "53", piece: "" },
//   { possibleMoves: [], pos: "54", piece: "" },
//   { possibleMoves: [], pos: "55", piece: "" },
//   { possibleMoves: [], pos: "56", piece: "" },
//   { possibleMoves: [], pos: "57", piece: "b_king" },
//   { possibleMoves: [], pos: "58", piece: "" },
//   { possibleMoves: [], pos: "61", piece: "" },
//   { possibleMoves: [], pos: "62", piece: "" },
//   { possibleMoves: [], pos: "63", piece: "" },
//   { possibleMoves: [], pos: "64", piece: "" },
//   { possibleMoves: [], pos: "65", piece: "" },
//   { possibleMoves: [], pos: "66", piece: "" },
//   { possibleMoves: [], pos: "67", piece: "" },
//   { possibleMoves: [], pos: "68", piece: "" },
//   { possibleMoves: [], pos: "71", piece: "" },
//   { possibleMoves: [], pos: "72", piece: "" },
//   { possibleMoves: [], pos: "73", piece: "" },
//   { possibleMoves: [], pos: "74", piece: "" },
//   { possibleMoves: [], pos: "75", piece: "" },
//   { possibleMoves: [], pos: "76", piece: "" },
//   { possibleMoves: [], pos: "77", piece: "" },
//   { possibleMoves: [], pos: "78", piece: "" },
//   { possibleMoves: [], pos: "81", piece: "" },
//   { possibleMoves: [], pos: "82", piece: "" },
//   { possibleMoves: [], pos: "83", piece: "" },
//   { possibleMoves: [], pos: "84", piece: "" },
//   { possibleMoves: [], pos: "85", piece: "" },
//   { possibleMoves: [], pos: "86", piece: "" },
//   { possibleMoves: [], pos: "87", piece: "" },
//   { possibleMoves: [], pos: "88", piece: "" },
// ];

const pieces = [
  { piece: "pawn", value: 1 },
  { piece: "rook", value: 5 },
  { piece: "knight", value: 3 },
  { piece: "bishop", value: 3 },
  { piece: "queen", value: 9 },
  { piece: "king", value: 0 },
];

const moves = [
  // pattern: "[x-change] [y-change]", conditions: "[any condition]"
  // + means positive change, - means negative change
  // all +'s and -'s in same pattern have same value

  // white pawn
  [
    { pattern: "0 1", conditions: "not capture" },
    { pattern: "1 1", conditions: "capture" },
    { pattern: "-1 1", conditions: "capture" },
    { pattern: "1 1", conditions: "en_passant" },
    { pattern: "-1 1", conditions: "en_passant" },
    { pattern: "0 2", conditions: "on y:2,not capture,empty y:3" },
  ],
  // black pawn
  [
    { pattern: "0 -1", conditions: "not capture" },
    { pattern: "1 -1", conditions: "capture" },
    { pattern: "-1 -1", conditions: "capture" },
    { pattern: "1 -1", conditions: "en_passant" },
    { pattern: "-1 -1", conditions: "en_passant" },
    { pattern: "0 -2", conditions: "on y:7,not capture,empty y:6" },
  ],
  // rook
  [
    { pattern: "0 +", conditions: "" },
    { pattern: "0 -", conditions: "" },
    { pattern: "+ 0", conditions: "" },
    { pattern: "- 0", conditions: "" },
  ],
  // knight
  [
    { pattern: "1 2", conditions: "" },
    { pattern: "-1 2", conditions: "" },
    { pattern: "1 -2", conditions: "" },
    { pattern: "-1 -2", conditions: "" },
    { pattern: "2 1", conditions: "" },
    { pattern: "-2 1", conditions: "" },
    { pattern: "2 -1", conditions: "" },
    { pattern: "-2 -1", conditions: "" },
  ],
  // bishop
  [
    { pattern: "+ +", conditions: "" },
    { pattern: "+ -", conditions: "" },
    { pattern: "- +", conditions: "" },
    { pattern: "- -", conditions: "" },
  ],
  // queen
  [
    { pattern: "+ +", conditions: "" },
    { pattern: "+ -", conditions: "" },
    { pattern: "- +", conditions: "" },
    { pattern: "- -", conditions: "" },
    { pattern: "0 +", conditions: "" },
    { pattern: "0 -", conditions: "" },
    { pattern: "+ 0", conditions: "" },
    { pattern: "- 0", conditions: "" },
  ],
  // king
  [
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
];

const numToLett = [
  [1, "a"],
  [2, "b"],
  [3, "c"],
  [4, "d"],
  [5, "e"],
  [6, "f"],
  [7, "g"],
  [8, "h"],
];

function numberToLetter(num) {
  num = parseInt(num);
  let letter;
  if (num > 8 || num < 1) {
    console.error(
      `Number out of range. \n range is ${numToLett[0][0]}-${
        numToLett[numToLett.length - 1][0]
      }; Number inputed was ${num}.`
    );
    return false;
  }
  letter = numToLett.find((x) => x[0] == num)[1];
  return letter;
}

function pieceToValue(piece) {
  let object = pieces.find((x) => x.piece == piece);
  if (object == undefined) {
    console.error(`Piece not found. \n Inputed value was ${piece}.`);
    return false;
  } else {
    return object.value;
  }
}
