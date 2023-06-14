const gameTypeStartingPositions = {
  classic: [
    ["R", "", "", "", "K", "", "", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"],
  ],
};

const piecesMoves = {
  p: [
    { pattern: { rankChange: -1, fileChange: 0 }, conditions: ["not capture"] },
    {
      pattern: { rankChange: -2, fileChange: 0 },
      conditions: [
        { function: "double advance" },
        { function: "not capture" },
        { function: "on rank", value: 7 },
        { function: "empty rank", value: 6 },
      ],
    },
    {
      pattern: { rankChange: -1, fileChange: 1 },
      conditions: [{ function: "capture" }],
    },
    {
      pattern: { rankChange: -1, fileChange: -1 },
      conditions: [{ function: "capture" }],
    },
    {
      pattern: { rankChange: -1, fileChange: -1 },
      conditions: [{ function: "en passant" }],
    },
    {
      pattern: { rankChange: -1, fileChange: 1 },
      conditions: [{ function: "en passant" }],
    },
  ],
  P: [
    {
      pattern: { rankChange: 1, fileChange: 0 },
      conditions: [{ function: "not capture" }],
    },
    {
      pattern: { rankChange: 2, fileChange: 0 },
      conditions: [
        { function: "double advance" },
        { function: "not capture" },
        { function: "on rank", value: 2 },
        { function: "empty rank", value: 3 },
      ],
    },
    {
      pattern: { rankChange: 1, fileChange: 1 },
      conditions: [{ function: "capture" }],
    },
    {
      pattern: { rankChange: 1, fileChange: -1 },
      conditions: [{ function: "capture" }],
    },
    {
      pattern: { rankChange: 1, fileChange: -1 },
      conditions: [{ function: "en passant" }],
    },
    {
      pattern: { rankChange: 1, fileChange: 1 },
      conditions: [{ function: "en passant" }],
    },
  ],
  q: [
    { pattern: "diagonal", conditions: [] },
    { pattern: "straight line", conditions: [] },
  ],
  b: [{ pattern: "diagonal", conditions: [] }],
  r: [{ pattern: "straight line", conditions: [] }],
  n: [
    { pattern: { rankChange: 1, fileChange: 2 }, conditions: [] },
    { pattern: { rankChange: -1, fileChange: 2 }, conditions: [] },
    { pattern: { rankChange: 1, fileChange: -2 }, conditions: [] },
    { pattern: { rankChange: -1, fileChange: 2 }, conditions: [] },
    { pattern: { rankChange: 2, fileChange: -1 }, conditions: [] },
    { pattern: { rankChange: 2, fileChange: 1 }, conditions: [] },
    { pattern: { rankChange: -2, fileChange: -1 }, conditions: [] },
    { pattern: { rankChange: -2, fileChange: 1 }, conditions: [] },
  ],
  k: [
    { pattern: { rankChange: 1, fileChange: 0 }, conditions: [] },
    { pattern: { rankChange: 1, fileChange: 1 }, conditions: [] },
    { pattern: { rankChange: 0, fileChange: 1 }, conditions: [] },
    { pattern: { rankChange: -1, fileChange: 1 }, conditions: [] },
    { pattern: { rankChange: -1, fileChange: 0 }, conditions: [] },
    { pattern: { rankChange: -1, fileChange: -1 }, conditions: [] },
    { pattern: { rankChange: 0, fileChange: -1 }, conditions: [] },
    { pattern: { rankChange: 1, fileChange: -1 }, conditions: [] },
    {
      pattern: { rankChange: 0, fileChange: 2 },
      conditions: [
        { function: "short castle" },
        { function: "empty file", value: "f" },
        { function: "empty file", value: "g" },
        { function: "not attacked" },
        { function: "file not attacked", value: "f" },
        { function: "file not attacked", value: "g" },
      ],
    },
    {
      pattern: { rankChange: 0, fileChange: -2 },
      conditions: [
        { function: "long castle" },
        { function: "empty file", value: "d" },
        { function: "empty file", value: "c" },
        { function: "empty file", value: "b" },
        { function: "not attacked" },
        { function: "file not attacked", value: "d" },
        { function: "file not attacked", value: "c" },
      ],
    },
  ],
};

// UTILITY FUNCTIONS

const alphabet = "abcdefghijklmnopqrstuvwxyz";
function numToLetter(num) {
  num = parseInt(num);

  num = (num - 1) % alphabet.length;
  return alphabet[num];
}
function letterToNum(letter) {
  if (typeof letter !== "string") return letter;

  letter = letter.substr(0, 1).toLowerCase();
  return alphabet.indexOf(letter) + 1;
}
