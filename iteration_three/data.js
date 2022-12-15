var spots = [
  //#region 1
  { pos: "11", piece: "w_rook" },
  { pos: "12", piece: "w_knight" },
  { pos: "13", piece: "w_bishop" },
  { pos: "14", piece: "w_queen" },
  { pos: "15", piece: "w_king" },
  { pos: "16", piece: "w_bishop" },
  { pos: "17", piece: "w_knight" },
  { pos: "18", piece: "w_rook" },
  //#endregion

  //#region 2
  { pos: "21", piece: "w_pawn" },
  { pos: "22", piece: "w_pawn" },
  { pos: "23", piece: "w_pawn" },
  { pos: "24", piece: "w_pawn" },
  { pos: "25", piece: "w_pawn" },
  { pos: "26", piece: "w_pawn" },
  { pos: "27", piece: "w_pawn" },
  { pos: "28", piece: "w_pawn" },
  //#endregion

  //#region 3
  { pos: "31", piece: "" },
  { pos: "32", piece: "" },
  { pos: "33", piece: "" },
  { pos: "34", piece: "" },
  { pos: "35", piece: "" },
  { pos: "36", piece: "" },
  { pos: "37", piece: "" },
  { pos: "38", piece: "" },
  //#endregion

  //#region 4
  { pos: "41", piece: "" },
  { pos: "42", piece: "" },
  { pos: "43", piece: "" },
  { pos: "44", piece: "" },
  { pos: "45", piece: "" },
  { pos: "46", piece: "" },
  { pos: "47", piece: "" },
  { pos: "48", piece: "" },
  //#endregion

  //#region 5
  { pos: "51", piece: "" },
  { pos: "52", piece: "" },
  { pos: "53", piece: "" },
  { pos: "54", piece: "" },
  { pos: "55", piece: "" },
  { pos: "56", piece: "" },
  { pos: "57", piece: "" },
  { pos: "58", piece: "" },
  //#endregion

  //#region 6
  { pos: "61", piece: "" },
  { pos: "62", piece: "" },
  { pos: "63", piece: "" },
  { pos: "64", piece: "" },
  { pos: "65", piece: "" },
  { pos: "66", piece: "" },
  { pos: "67", piece: "" },
  { pos: "68", piece: "" },
  //#endregion

  //#region 7
  { pos: "71", piece: "b_pawn" },
  { pos: "72", piece: "b_pawn" },
  { pos: "73", piece: "b_pawn" },
  { pos: "74", piece: "b_pawn" },
  { pos: "75", piece: "b_pawn" },
  { pos: "76", piece: "b_pawn" },
  { pos: "77", piece: "b_pawn" },
  { pos: "78", piece: "b_pawn" },
  //#endregion

  //#region 8
  { pos: "81", piece: "b_rook" },
  { pos: "82", piece: "b_knight" },
  { pos: "83", piece: "b_bishop" },
  { pos: "84", piece: "b_queen" },
  { pos: "85", piece: "b_king" },
  { pos: "86", piece: "b_bishop" },
  { pos: "87", piece: "b_knight" },
  { pos: "88", piece: "b_rook" },
  //#endregion
];

// var spots = [
//   { pos: "11", piece: "w_rook" },
//   { pos: "12", piece: "" },
//   { pos: "13", piece: "" },
//   { pos: "14", piece: "w_queen" },
//   { pos: "15", piece: "w_king" },
//   { pos: "16", piece: "" },
//   { pos: "17", piece: "" },
//   { pos: "18", piece: "w_rook" },
//   { pos: "21", piece: "" },
//   { pos: "22", piece: "" },
//   { pos: "23", piece: "" },
//   { pos: "24", piece: "" },
//   { pos: "25", piece: "" },
//   { pos: "26", piece: "" },
//   { pos: "27", piece: "" },
//   { pos: "28", piece: "b_pawn" },
//   { pos: "31", piece: "" },
//   { pos: "32", piece: "" },
//   { pos: "33", piece: "" },
//   { pos: "34", piece: "b_king" },
//   { pos: "35", piece: "" },
//   { pos: "36", piece: "" },
//   { pos: "37", piece: "" },
//   { pos: "38", piece: "" },
//   { pos: "41", piece: "w_pawn" },
//   { pos: "42", piece: "w_pawn" },
//   { pos: "43", piece: "w_pawn" },
//   { pos: "44", piece: "w_pawn" },
//   { pos: "45", piece: "w_pawn" },
//   { pos: "46", piece: "w_pawn" },
//   { pos: "47", piece: "w_pawn" },
//   { pos: "48", piece: "w_pawn" },
//   { pos: "51", piece: "b_pawn" },
//   { pos: "52", piece: "b_pawn" },
//   { pos: "53", piece: "b_pawn" },
//   { pos: "54", piece: "b_pawn" },
//   { pos: "55", piece: "b_pawn" },
//   { pos: "56", piece: "b_pawn" },
//   { pos: "57", piece: "b_pawn" },
//   { pos: "58", piece: "b_pawn" },
//   { pos: "61", piece: "" },
//   { pos: "62", piece: "" },
//   { pos: "63", piece: "" },
//   { pos: "64", piece: "" },
//   { pos: "65", piece: "" },
//   { pos: "66", piece: "" },
//   { pos: "67", piece: "" },
//   { pos: "68", piece: "" },
//   { pos: "71", piece: "" },
//   { pos: "72", piece: "" },
//   { pos: "73", piece: "" },
//   { pos: "74", piece: "" },
//   { pos: "75", piece: "" },
//   { pos: "76", piece: "" },
//   { pos: "77", piece: "" },
//   { pos: "78", piece: "" },
//   { pos: "81", piece: "b_rook" },
//   { pos: "82", piece: "" },
//   { pos: "83", piece: "" },
//   { pos: "84", piece: "b_queen" },
//   { pos: "85", piece: "b_king" },
//   { pos: "86", piece: "" },
//   { pos: "87", piece: "" },
//   { pos: "88", piece: "b_rook" },
// ];

const pieces = ["pawn", "rook", "knight", "bishop", "queen", "king"];

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
    { pattern: "2 0", conditions: "castle-short,empty x:6,empty x:7" },
    {
      pattern: "-2 0",
      conditions: "castle-long,empty x:2,empty x:3,empty x:4",
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
      `Number out of range \n range is ${numToLett[0][0]}-${
        numToLett[numToLett.length - 1][0]
      }; Number inputed was ${num}`
    );
    return false;
  }
  letter = numToLett.find((x) => x[0] == num)[1];
  return letter;
}
