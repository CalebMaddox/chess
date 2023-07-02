const gameTypeStartingPositions = {
  classic: [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"],
  ],
  promote: [
    ["R", "N", "B", "Q", "K", "B", "", ""],
    ["P", "P", "P", "P", "P", "P", "p", "p"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["p", "p", "p", "p", "p", "p", "P", "P"],
    ["r", "n", "b", "q", "k", "b", "", ""],
  ],
  disambiguity: [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "Q", "Q", "", "", ""],
    ["", "", "", "Q", "p", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["p", "p", "p", "p", "", "p", "p", "p"],
    ["r", "n", "b", "p", "k", "p", "b", "r"],
  ],
};

const buttonsForOpponents = {
  self: [
    { text: "Undo", func: "undoMove" },
    { text: "Redo", func: "redoMove" },
  ],
  comp: [
    { text: "Resign", func: "resign" },
    { text: "Draw", func: "offerDraw" },
  ],
  online: [
    { text: "Resign", func: "resign" },
    { text: "Draw", func: "offerDraw" },
  ],
};

const piecesMoves = {
  p: [
    {
      pattern: { rankChange: -1, fileChange: 0 },
      conditions: [{ function: "not capture" }],
    },
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
    { pattern: { rankChange: -1, fileChange: -2 }, conditions: [] },
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
        { function: "empty file", value: 6 },
        { function: "empty file", value: 7 },
        { function: "not attacked" },
        { function: "file not attacked", value: 6 },
        { function: "file not attacked", value: 7 },
      ],
    },
    {
      pattern: { rankChange: 0, fileChange: -2 },
      conditions: [
        { function: "long castle" },
        { function: "empty file", value: 4 },
        { function: "empty file", value: 3 },
        { function: "empty file", value: 2 },
        { function: "not attacked" },
        { function: "file not attacked", value: 4 },
        { function: "file not attacked", value: 3 },
      ],
    },
  ],
};
