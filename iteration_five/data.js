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

const testingHistory = [
  {
    move: null,
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 1,
        rank: 2,
      },
      capture: false,
      to: {
        file: 1,
        rank: 3,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 1,
        rank: 2,
      },
      {
        file: 1,
        rank: 3,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "N",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 7,
        rank: 8,
      },
      capture: false,
      to: {
        file: 6,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 7,
        rank: 8,
      },
      {
        file: 6,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 3,
        rank: 2,
      },
      capture: false,
      to: {
        file: 3,
        rank: 4,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 3,
        rank: 2,
      },
      {
        file: 3,
        rank: 4,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 3,
        rank: 7,
      },
      capture: false,
      to: {
        file: 3,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 3,
        rank: 7,
      },
      {
        file: 3,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "N",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 7,
        rank: 1,
      },
      capture: false,
      to: {
        file: 6,
        rank: 3,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 7,
        rank: 1,
      },
      {
        file: 6,
        rank: 3,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 4,
        rank: 7,
      },
      capture: false,
      to: {
        file: 4,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 4,
        rank: 7,
      },
      {
        file: 4,
        rank: 5,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 5,
        rank: 2,
      },
      capture: false,
      to: {
        file: 5,
        rank: 3,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 5,
        rank: 2,
      },
      {
        file: 5,
        rank: 3,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "B",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 3,
        rank: 8,
      },
      capture: false,
      to: {
        file: 7,
        rank: 4,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 3,
        rank: 8,
      },
      {
        file: 7,
        rank: 4,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 8,
        rank: 2,
      },
      capture: false,
      to: {
        file: 8,
        rank: 3,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 8,
        rank: 2,
      },
      {
        file: 8,
        rank: 3,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "B",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 7,
        rank: 4,
      },
      capture: false,
      to: {
        file: 8,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 7,
        rank: 4,
      },
      {
        file: 8,
        rank: 5,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 3,
        rank: 4,
      },
      capture: true,
      to: {
        file: 4,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 3,
        rank: 4,
      },
      {
        file: 4,
        rank: 5,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 3,
        rank: 6,
      },
      capture: true,
      to: {
        file: 4,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 3,
        rank: 6,
      },
      {
        file: 4,
        rank: 5,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "N",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 2,
        rank: 1,
      },
      capture: false,
      to: {
        file: 3,
        rank: 3,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 2,
        rank: 1,
      },
      {
        file: 3,
        rank: 3,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "N",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 2,
        rank: 8,
      },
      capture: false,
      to: {
        file: 3,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 2,
        rank: 8,
      },
      {
        file: 3,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "B",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 6,
        rank: 1,
      },
      capture: false,
      to: {
        file: 2,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 6,
        rank: 1,
      },
      {
        file: 2,
        rank: 5,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "R",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 1,
        rank: 8,
      },
      capture: false,
      to: {
        file: 3,
        rank: 8,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 1,
        rank: 8,
      },
      {
        file: 3,
        rank: 8,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 7,
        rank: 2,
      },
      capture: false,
      to: {
        file: 7,
        rank: 4,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 7,
        rank: 2,
      },
      {
        file: 7,
        rank: 4,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "B",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 8,
        rank: 5,
      },
      capture: false,
      to: {
        file: 7,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 8,
        rank: 5,
      },
      {
        file: 7,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "Q",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 4,
        rank: 1,
      },
      capture: false,
      to: {
        file: 1,
        rank: 4,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 4,
        rank: 1,
      },
      {
        file: 1,
        rank: 4,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "N",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 6,
        rank: 6,
      },
      capture: false,
      to: {
        file: 4,
        rank: 7,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 6,
        rank: 6,
      },
      {
        file: 4,
        rank: 7,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 2,
        rank: 2,
      },
      capture: false,
      to: {
        file: 2,
        rank: 4,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 2,
        rank: 2,
      },
      {
        file: 2,
        rank: 4,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 5,
        rank: 7,
      },
      capture: false,
      to: {
        file: 5,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 5,
        rank: 7,
      },
      {
        file: 5,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "B",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 3,
        rank: 1,
      },
      capture: false,
      to: {
        file: 2,
        rank: 2,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 3,
        rank: 1,
      },
      {
        file: 2,
        rank: 2,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "B",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 6,
        rank: 8,
      },
      capture: false,
      to: {
        file: 5,
        rank: 7,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 6,
        rank: 8,
      },
      {
        file: 5,
        rank: 7,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "B",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 2,
        rank: 5,
      },
      capture: true,
      to: {
        file: 3,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 2,
        rank: 5,
      },
      {
        file: 3,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 2,
        rank: 7,
      },
      capture: true,
      to: {
        file: 3,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 2,
        rank: 7,
      },
      {
        file: 3,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "Q",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 1,
        rank: 4,
      },
      capture: true,
      to: {
        file: 1,
        rank: 7,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 1,
        rank: 4,
      },
      {
        file: 1,
        rank: 7,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 3,
        rank: 6,
      },
      capture: false,
      to: {
        file: 3,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 3,
        rank: 6,
      },
      {
        file: 3,
        rank: 5,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "Q",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 1,
        rank: 7,
      },
      capture: false,
      to: {
        file: 1,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 1,
        rank: 7,
      },
      {
        file: 1,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: true,
      longCastle: false,
      pieceNotation: "K",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 5,
        rank: 8,
      },
      capture: false,
      to: {
        file: 7,
        rank: 8,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 5,
        rank: 8,
      },
      {
        file: 7,
        rank: 8,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "Q",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 1,
        rank: 6,
      },
      capture: false,
      to: {
        file: 5,
        rank: 2,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 1,
        rank: 6,
      },
      {
        file: 5,
        rank: 2,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 3,
        rank: 5,
      },
      capture: false,
      to: {
        file: 3,
        rank: 4,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 3,
        rank: 5,
      },
      {
        file: 3,
        rank: 4,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 5,
        rank: 3,
      },
      capture: false,
      to: {
        file: 5,
        rank: 4,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 5,
        rank: 3,
      },
      {
        file: 5,
        rank: 4,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 4,
        rank: 5,
      },
      capture: false,
      to: {
        file: 4,
        rank: 4,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 4,
        rank: 5,
      },
      {
        file: 4,
        rank: 4,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "N",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 3,
        rank: 3,
      },
      capture: false,
      to: {
        file: 2,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 3,
        rank: 3,
      },
      {
        file: 2,
        rank: 5,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 5,
        rank: 6,
      },
      capture: false,
      to: {
        file: 5,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 5,
        rank: 6,
      },
      {
        file: 5,
        rank: 5,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 8,
        rank: 3,
      },
      capture: false,
      to: {
        file: 8,
        rank: 4,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 8,
        rank: 3,
      },
      {
        file: 8,
        rank: 4,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "Q",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 4,
        rank: 8,
      },
      capture: false,
      to: {
        file: 2,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 4,
        rank: 8,
      },
      {
        file: 2,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 1,
        rank: 3,
      },
      capture: false,
      to: {
        file: 1,
        rank: 4,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 1,
        rank: 3,
      },
      {
        file: 1,
        rank: 4,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "Q",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 2,
        rank: 6,
      },
      capture: false,
      to: {
        file: 2,
        rank: 7,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 2,
        rank: 6,
      },
      {
        file: 2,
        rank: 7,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "N",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 6,
        rank: 3,
      },
      capture: false,
      to: {
        file: 7,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 6,
        rank: 3,
      },
      {
        file: 7,
        rank: 5,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 8,
        rank: 7,
      },
      capture: false,
      to: {
        file: 8,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 8,
        rank: 7,
      },
      {
        file: 8,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 8,
        rank: 4,
      },
      capture: false,
      to: {
        file: 8,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 8,
        rank: 4,
      },
      {
        file: 8,
        rank: 5,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 8,
        rank: 6,
      },
      capture: true,
      to: {
        file: 7,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 8,
        rank: 6,
      },
      {
        file: 7,
        rank: 5,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 8,
        rank: 5,
      },
      capture: true,
      to: {
        file: 7,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 8,
        rank: 5,
      },
      {
        file: 7,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 6,
        rank: 7,
      },
      capture: true,
      to: {
        file: 7,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 6,
        rank: 7,
      },
      {
        file: 7,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 6,
        rank: 2,
      },
      capture: false,
      to: {
        file: 6,
        rank: 3,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 6,
        rank: 2,
      },
      {
        file: 6,
        rank: 3,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "B",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 5,
        rank: 7,
      },
      capture: true,
      to: {
        file: 2,
        rank: 4,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 5,
        rank: 7,
      },
      {
        file: 2,
        rank: 4,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "B",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 2,
        rank: 2,
      },
      capture: false,
      to: {
        file: 1,
        rank: 3,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 2,
        rank: 2,
      },
      {
        file: 1,
        rank: 3,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "B",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 2,
        rank: 4,
      },
      capture: true,
      to: {
        file: 1,
        rank: 3,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 2,
        rank: 4,
      },
      {
        file: 1,
        rank: 3,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "R",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 1,
        rank: 1,
      },
      capture: true,
      to: {
        file: 1,
        rank: 3,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 1,
        rank: 1,
      },
      {
        file: 1,
        rank: 3,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "Q",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 2,
        rank: 7,
      },
      capture: false,
      to: {
        file: 2,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 2,
        rank: 7,
      },
      {
        file: 2,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "Q",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 5,
        rank: 2,
      },
      capture: false,
      to: {
        file: 8,
        rank: 2,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 5,
        rank: 2,
      },
      {
        file: 8,
        rank: 2,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "Q",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 2,
        rank: 6,
      },
      capture: false,
      to: {
        file: 3,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 2,
        rank: 6,
      },
      {
        file: 3,
        rank: 5,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "Q",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 8,
        rank: 2,
      },
      capture: false,
      to: {
        file: 8,
        rank: 7,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 8,
        rank: 2,
      },
      {
        file: 8,
        rank: 7,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "K",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 7,
        rank: 8,
      },
      capture: false,
      to: {
        file: 6,
        rank: 7,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 7,
        rank: 8,
      },
      {
        file: 6,
        rank: 7,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "R",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 1,
        rank: 3,
      },
      capture: false,
      to: {
        file: 1,
        rank: 1,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 1,
        rank: 3,
      },
      {
        file: 1,
        rank: 1,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "N",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 4,
        rank: 7,
      },
      capture: false,
      to: {
        file: 6,
        rank: 6,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 4,
        rank: 7,
      },
      {
        file: 6,
        rank: 6,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "Q",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 8,
        rank: 7,
      },
      capture: false,
      to: {
        file: 8,
        rank: 2,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 8,
        rank: 7,
      },
      {
        file: 8,
        rank: 2,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "R",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 3,
        rank: 8,
      },
      capture: false,
      to: {
        file: 1,
        rank: 8,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 3,
        rank: 8,
      },
      {
        file: 1,
        rank: 8,
      },
    ],
  },
  {
    move: {
      player: "white",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "P",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 4,
        rank: 2,
      },
      capture: false,
      to: {
        file: 4,
        rank: 3,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 4,
        rank: 2,
      },
      {
        file: 4,
        rank: 3,
      },
    ],
  },
  {
    move: {
      player: "black",
      shortCastle: false,
      longCastle: false,
      pieceNotation: "Q",
      disambiguity: {
        necessary: {
          file: false,
          rank: false,
        },
        file: 3,
        rank: 5,
      },
      capture: true,
      to: {
        file: 2,
        rank: 5,
      },
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: {
        is: false,
        promoteTo: null,
      },
    },
    position: [
      ["R", "", "", "", "K", "", "", "R"],
      ["", "", "", "", "", "", "", "Q"],
      ["", "", "", "P", "", "P", "", ""],
      ["P", "", "p", "p", "P", "", "P", ""],
      ["", "q", "", "", "p", "", "p", ""],
      ["", "", "", "", "", "n", "p", ""],
      ["", "", "", "", "", "k", "p", ""],
      ["r", "", "", "", "", "r", "", ""],
    ],
    highlighted: [
      {
        file: 3,
        rank: 5,
      },
      {
        file: 2,
        rank: 5,
      },
    ],
  },
];
