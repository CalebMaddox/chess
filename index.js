var spots = [
  {
    row: "1",
    column: "1",
    occupied: true,
    piece: "w_rook",
  },
  {
    row: "1",
    column: "2",
    occupied: true,
    piece: "w_knight",
  },
  {
    row: "1",
    column: "3",
    occupied: true,
    piece: "w_bishop",
  },
  {
    row: "1",
    column: "4",
    occupied: true,
    piece: "w_queen",
  },
  {
    row: "1",
    column: "5",
    occupied: true,
    piece: "w_king",
  },
  {
    row: "1",
    column: "6",
    occupied: true,
    piece: "w_bishop",
  },
  {
    row: "1",
    column: "7",
    occupied: true,
    piece: "w_knight",
  },
  {
    row: "1",
    column: "8",
    occupied: true,
    piece: "w_rook",
  },
  {
    row: "2",
    column: "1",
    occupied: true,
    piece: "w_pawn",
  },
  {
    row: "2",
    column: "2",
    occupied: true,
    piece: "w_pawn",
  },
  {
    row: "2",
    column: "3",
    occupied: true,
    piece: "w_pawn",
  },
  {
    row: "2",
    column: "4",
    occupied: true,
    piece: "w_pawn",
  },
  {
    row: "2",
    column: "5",
    occupied: true,
    piece: "w_pawn",
  },
  {
    row: "2",
    column: "6",
    occupied: true,
    piece: "w_pawn",
  },
  {
    row: "2",
    column: "7",
    occupied: true,
    piece: "w_pawn",
  },
  {
    row: "2",
    column: "8",
    occupied: true,
    piece: "w_pawn",
  },
  {
    row: "3",
    column: "1",
    occupied: false,
    piece: null,
  },
  {
    row: "3",
    column: "2",
    occupied: false,
    piece: null,
  },
  {
    row: "3",
    column: "3",
    occupied: false,
    piece: null,
  },
  {
    row: "3",
    column: "4",
    occupied: false,
    piece: null,
  },
  {
    row: "3",
    column: "5",
    occupied: false,
    piece: null,
  },
  {
    row: "3",
    column: "6",
    occupied: false,
    piece: null,
  },
  {
    row: "3",
    column: "7",
    occupied: false,
    piece: null,
  },
  {
    row: "3",
    column: "8",
    occupied: false,
    piece: null,
  },
  {
    row: "4",
    column: "1",
    occupied: false,
    piece: null,
  },
  {
    row: "4",
    column: "2",
    occupied: false,
    piece: null,
  },
  {
    row: "4",
    column: "3",
    occupied: false,
    piece: null,
  },
  {
    row: "4",
    column: "4",
    occupied: false,
    piece: null,
  },
  {
    row: "4",
    column: "5",
    occupied: false,
    piece: null,
  },
  {
    row: "4",
    column: "6",
    occupied: false,
    piece: null,
  },
  {
    row: "4",
    column: "7",
    occupied: false,
    piece: null,
  },
  {
    row: "4",
    column: "8",
    occupied: false,
    piece: null,
  },
  {
    row: "5",
    column: "1",
    occupied: false,
    piece: null,
  },
  {
    row: "5",
    column: "2",
    occupied: false,
    piece: null,
  },
  {
    row: "5",
    column: "3",
    occupied: false,
    piece: null,
  },
  {
    row: "5",
    column: "4",
    occupied: false,
    piece: null,
  },
  {
    row: "5",
    column: "5",
    occupied: false,
    piece: null,
  },
  {
    row: "5",
    column: "6",
    occupied: false,
    piece: null,
  },
  {
    row: "5",
    column: "7",
    occupied: false,
    piece: null,
  },
  {
    row: "5",
    column: "8",
    occupied: false,
    piece: null,
  },
  {
    row: "6",
    column: "1",
    occupied: false,
    piece: null,
  },
  {
    row: "6",
    column: "2",
    occupied: false,
    piece: null,
  },
  {
    row: "6",
    column: "3",
    occupied: false,
    piece: null,
  },
  {
    row: "6",
    column: "4",
    occupied: false,
    piece: null,
  },
  {
    row: "6",
    column: "5",
    occupied: false,
    piece: null,
  },
  {
    row: "6",
    column: "6",
    occupied: false,
    piece: null,
  },
  {
    row: "6",
    column: "7",
    occupied: false,
    piece: null,
  },
  {
    row: "6",
    column: "8",
    occupied: false,
    piece: null,
  },
  {
    row: "7",
    column: "1",
    occupied: true,
    piece: "b_pawn",
  },
  {
    row: "7",
    column: "2",
    occupied: true,
    piece: "b_pawn",
  },
  {
    row: "7",
    column: "3",
    occupied: true,
    piece: "b_pawn",
  },
  {
    row: "7",
    column: "4",
    occupied: true,
    piece: "b_pawn",
  },
  {
    row: "7",
    column: "5",
    occupied: true,
    piece: "b_pawn",
  },
  {
    row: "7",
    column: "6",
    occupied: true,
    piece: "b_pawn",
  },
  {
    row: "7",
    column: "7",
    occupied: true,
    piece: "b_pawn",
  },
  {
    row: "7",
    column: "8",
    occupied: true,
    piece: "b_pawn",
  },
  {
    row: "8",
    column: "1",
    occupied: true,
    piece: "b_rook",
  },
  {
    row: "8",
    column: "2",
    occupied: true,
    piece: "b_knight",
  },
  {
    row: "8",
    column: "3",
    occupied: true,
    piece: "b_bishop",
  },
  {
    row: "8",
    column: "4",
    occupied: true,
    piece: "b_queen",
  },
  {
    row: "8",
    column: "5",
    occupied: true,
    piece: "b_king",
  },
  {
    row: "8",
    column: "6",
    occupied: true,
    piece: "b_bishop",
  },
  {
    row: "8",
    column: "7",
    occupied: true,
    piece: "b_knight",
  },
  {
    row: "8",
    column: "8",
    occupied: true,
    piece: "b_rook",
  },
];
var currentPlayer = "w";
var selectedSpot = { row: -1 };
var w_castleLong = true;
var w_castleShort = true;
var b_castleLong = true;
var b_castleShort = true;
var w_en_passant = { row: "", column: "", age: "0" };
var b_en_passant = { row: "", column: "", age: "0" };
var globalRow;
var globalColumn;
var ready = true;

function spotClicked(element) {
  if (!ready) return;
  let row = element.id.substr(4, 1);
  let column = element.id.substr(5, 1);
  if (spots.find((x) => x.row == row && x.column == column).piece != null) {
    let dots = document.getElementsByClassName("dot");
    for (i = dots.length - 1; i >= 0; i--) {
      dots[i].classList.remove("dot");
    }
    if (
      spots
        .find((x) => x.row == row && x.column == column)
        .piece.substring(0, 1) != currentPlayer
    ) {
      move(row, column);
    } else {
      if (selectedSpot.row != -1) {
        let color = "#222";
        if (
          (selectedSpot.row % 2 == 0 && selectedSpot.column % 2 == 1) ||
          (selectedSpot.row % 2 == 1 && selectedSpot.column % 2 == 0)
        )
          color = "#eee";
        document.getElementById(
          `spot${selectedSpot.row}${selectedSpot.column}`
        ).style.backgroundColor = color;
      }
      selectedSpot = spots.find((x) => x.row == row && x.column == column);
      document.getElementById(
        `spot${selectedSpot.row}${selectedSpot.column}`
      ).style.backgroundColor = "yellow";
      possibleMoves(row, column);
    }
  } else {
    move(row, column);
  }
}

function move(row, column) {
  if (selectedSpot.row != -1) {
    switch (selectedSpot.piece) {
      case "w_pawn":
        w_pawn(row, column);
        break;
      case "b_pawn":
        b_pawn(row, column);
        break;
      case "w_rook":
        rook(row, column);
        break;
      case "b_rook":
        rook(row, column);
        break;
      case "w_knight":
        knight(row, column);
        break;
      case "b_knight":
        knight(row, column);
        break;
      case "w_bishop":
        bishop(row, column);
        break;
      case "b_bishop":
        bishop(row, column);
        break;
      case "w_king":
        w_king(row, column);
        break;
      case "b_king":
        b_king(row, column);
        break;
      case "w_queen":
        queen(row, column);
        break;
      case "b_queen":
        queen(row, column);
        break;
    }
  }
}

function possibleMoves(row, column) {
  switch (spots.find((x) => x.row == row && x.column == column).piece) {
    case "w_pawn":
      if (
        spots.find((x) => x.row == parseInt(row) + 1 && x.column == column)
          .piece == null
      ) {
        document
          .getElementById(`spot${parseInt(row) + 1}${column}`)
          .classList.add("dot");
        if (
          row == "2" &&
          spots.find((x) => x.row == parseInt(row) + 2 && x.column == column)
            .piece == null
        ) {
          document
            .getElementById(`spot${parseInt(row) + 2}${column}`)
            .classList.add("dot");
        }
      }
      if (
        column != 1 &&
        spots.find(
          (x) => x.row == parseInt(row) + 1 && x.column == parseInt(column) - 1
        ).piece != null
      ) {
        if (
          spots
            .find(
              (x) =>
                x.row == parseInt(row) + 1 && x.column == parseInt(column) - 1
            )
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${parseInt(row) + 1}${parseInt(column) - 1}`)
            .classList.add("dot");
        }
      }
      if (
        column != 8 &&
        spots.find(
          (x) => x.row == parseInt(row) + 1 && x.column == parseInt(column) + 1
        ).piece != null
      ) {
        if (
          spots
            .find(
              (x) =>
                x.row == parseInt(row) + 1 && x.column == parseInt(column) + 1
            )
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${parseInt(row) + 1}${parseInt(column) + 1}`)
            .classList.add("dot");
        }
      }
      if (
        row == parseInt(w_en_passant.row) - 1 &&
        1 == Math.abs(parseInt(w_en_passant.column) - column)
      ) {
        document
          .getElementById(`spot${w_en_passant.row}${w_en_passant.column}`)
          .classList.add("dot");
      }
      break;
    case "b_pawn":
      if (
        spots.find((x) => x.row == parseInt(row) - 1 && x.column == column)
          .piece == null
      ) {
        document
          .getElementById(`spot${parseInt(row) - 1}${column}`)
          .classList.add("dot");
        if (
          row == "7" &&
          spots.find((x) => x.row == parseInt(row) - 2 && x.column == column)
            .piece == null
        ) {
          document
            .getElementById(`spot${parseInt(row) - 2}${column}`)
            .classList.add("dot");
        }
      }

      if (
        column != 1 &&
        spots.find(
          (x) => x.row == parseInt(row) - 1 && x.column == parseInt(column) - 1
        ).piece != null
      ) {
        if (
          spots
            .find(
              (x) =>
                x.row == parseInt(row) - 1 && x.column == parseInt(column) - 1
            )
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${parseInt(row) - 1}${parseInt(column) - 1}`)
            .classList.add("dot");
        }
      }
      if (
        column != 8 &&
        spots.find(
          (x) => x.row == parseInt(row) - 1 && x.column == parseInt(column) + 1
        ).piece != null
      ) {
        if (
          spots
            .find(
              (x) =>
                x.row == parseInt(row) - 1 && x.column == parseInt(column) + 1
            )
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${parseInt(row) - 1}${parseInt(column) + 1}`)
            .classList.add("dot");
        }
      }
      if (
        row == parseInt(b_en_passant.row) + 1 &&
        1 == Math.abs(parseInt(b_en_passant.column) - column)
      ) {
        document
          .getElementById(`spot${b_en_passant.row}${b_en_passant.column}`)
          .classList.add("dot");
      }
      break;
    case "w_rook":
      for (i = 1; i <= 8 - row; i++) {
        if (
          spots.find((x) => x.row == parseInt(row) + i && x.column == column)
            .occupied != true
        ) {
          document
            .getElementById(`spot${parseInt(row) + i}${column}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == parseInt(row) + i && x.column == column)
              .piece.substring(0, 1) == "b"
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${column}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = -1; i >= 1 - row; i--) {
        if (
          spots.find((x) => x.row == parseInt(row) + i && x.column == column)
            .occupied != true
        ) {
          document
            .getElementById(`spot${parseInt(row) + i}${column}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == parseInt(row) + i && x.column == column)
              .piece.substring(0, 1) == "b"
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${column}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = 1; i <= 8 - column; i++) {
        if (
          spots.find((x) => x.row == row && x.column == parseInt(column) + i)
            .occupied != true
        ) {
          document
            .getElementById(`spot${row}${parseInt(column) + i}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == row && x.column == parseInt(column) + i)
              .piece.substring(0, 1) == "b"
          ) {
            document
              .getElementById(`spot${row}${parseInt(column) + i}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = -1; i >= 1 - column; i--) {
        if (
          spots.find((x) => x.row == row && x.column == parseInt(column) + i)
            .occupied != true
        ) {
          document
            .getElementById(`spot${row}${parseInt(column) + i}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == row && x.column == parseInt(column) + i)
              .piece.substring(0, 1) == "b"
          ) {
            document
              .getElementById(`spot${row}${parseInt(column) + i}`)
              .classList.add("dot");
          }
          break;
        }
      }
      break;
    case "b_rook":
      for (i = 1; i <= 8 - row; i++) {
        if (
          spots.find((x) => x.row == parseInt(row) + i && x.column == column)
            .occupied != true
        ) {
          document
            .getElementById(`spot${parseInt(row) + i}${column}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == parseInt(row) + i && x.column == column)
              .piece.substring(0, 1) == "w"
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${column}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = -1; i >= 1 - row; i--) {
        if (
          spots.find((x) => x.row == parseInt(row) + i && x.column == column)
            .occupied != true
        ) {
          document
            .getElementById(`spot${parseInt(row) + i}${column}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == parseInt(row) + i && x.column == column)
              .piece.substring(0, 1) == "w"
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${column}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = 1; i <= 8 - column; i++) {
        if (
          spots.find((x) => x.row == row && x.column == parseInt(column) + i)
            .occupied != true
        ) {
          document
            .getElementById(`spot${row}${parseInt(column) + i}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == row && x.column == parseInt(column) + i)
              .piece.substring(0, 1) == "w"
          ) {
            document
              .getElementById(`spot${row}${parseInt(column) + i}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = -1; i >= 1 - column; i--) {
        if (
          spots.find((x) => x.row == row && x.column == parseInt(column) + i)
            .occupied != true
        ) {
          document
            .getElementById(`spot${row}${parseInt(column) + i}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == row && x.column == parseInt(column) + i)
              .piece.substring(0, 1) == "w"
          ) {
            document
              .getElementById(`spot${row}${parseInt(column) + i}`)
              .classList.add("dot");
          }
          break;
        }
      }
      break;
    case "w_knight":
      if (row >= 2 && column >= 3) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) - 1 && x.column == parseInt(column) - 2
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) - 1 && x.column == parseInt(column) - 2
            )
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${parseInt(row) - 1}${parseInt(column) - 2}`)
            .classList.add("dot");
        }
      }
      if (row >= 2 && column <= 6) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) - 1 && x.column == parseInt(column) + 2
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) - 1 && x.column == parseInt(column) + 2
            )
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${parseInt(row) - 1}${parseInt(column) + 2}`)
            .classList.add("dot");
        }
      }
      if (row <= 7 && column >= 3) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) + 1 && x.column == parseInt(column) - 2
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) + 1 && x.column == parseInt(column) - 2
            )
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${parseInt(row) + 1}${parseInt(column) - 2}`)
            .classList.add("dot");
        }
      }
      if (row <= 7 && column <= 6) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) + 1 && x.column == parseInt(column) + 2
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) + 1 && x.column == parseInt(column) + 2
            )
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${parseInt(row) + 1}${parseInt(column) + 2}`)
            .classList.add("dot");
        }
      }
      if (row <= 6 && column <= 7) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) + 2 && x.column == parseInt(column) + 1
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) + 2 && x.column == parseInt(column) + 1
            )
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${parseInt(row) + 2}${parseInt(column) + 1}`)
            .classList.add("dot");
        }
      }
      if (row <= 6 && column >= 2) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) + 2 && x.column == parseInt(column) - 1
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) + 2 && x.column == parseInt(column) - 1
            )
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${parseInt(row) + 2}${parseInt(column) - 1}`)
            .classList.add("dot");
        }
      }
      if (row >= 3 && column <= 7) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) - 2 && x.column == parseInt(column) + 1
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) - 2 && x.column == parseInt(column) + 1
            )
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${parseInt(row) - 2}${parseInt(column) + 1}`)
            .classList.add("dot");
        }
      }
      if (row >= 3 && column >= 2) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) - 2 && x.column == parseInt(column) - 1
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) - 2 && x.column == parseInt(column) - 1
            )
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${parseInt(row) - 2}${parseInt(column) - 1}`)
            .classList.add("dot");
        }
      }
      break;
    case "b_knight":
      if (row >= 2 && column >= 3) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) - 1 && x.column == parseInt(column) - 2
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) - 1 && x.column == parseInt(column) - 2
            )
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${parseInt(row) - 1}${parseInt(column) - 2}`)
            .classList.add("dot");
        }
      }
      if (row >= 2 && column <= 6) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) - 1 && x.column == parseInt(column) + 2
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) - 1 && x.column == parseInt(column) + 2
            )
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${parseInt(row) - 1}${parseInt(column) + 2}`)
            .classList.add("dot");
        }
      }
      if (row <= 7 && column >= 3) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) + 1 && x.column == parseInt(column) - 2
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) + 1 && x.column == parseInt(column) - 2
            )
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${parseInt(row) + 1}${parseInt(column) - 2}`)
            .classList.add("dot");
        }
      }
      if (row <= 7 && column <= 6) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) + 1 && x.column == parseInt(column) + 2
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) + 1 && x.column == parseInt(column) + 2
            )
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${parseInt(row) + 1}${parseInt(column) + 2}`)
            .classList.add("dot");
        }
      }
      if (row <= 6 && column <= 7) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) + 2 && x.column == parseInt(column) + 1
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) + 2 && x.column == parseInt(column) + 1
            )
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${parseInt(row) + 2}${parseInt(column) + 1}`)
            .classList.add("dot");
        }
      }
      if (row <= 6 && column >= 2) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) + 2 && x.column == parseInt(column) - 1
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) + 2 && x.column == parseInt(column) - 1
            )
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${parseInt(row) + 2}${parseInt(column) - 1}`)
            .classList.add("dot");
        }
      }
      if (row >= 3 && column <= 7) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) - 2 && x.column == parseInt(column) + 1
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) - 2 && x.column == parseInt(column) + 1
            )
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${parseInt(row) - 2}${parseInt(column) + 1}`)
            .classList.add("dot");
        }
      }
      if (row >= 3 && column >= 2) {
        if (
          spots.find(
            (x) =>
              x.row == parseInt(row) - 2 && x.column == parseInt(column) - 1
          ).piece == null ||
          spots
            .find(
              (x) =>
                x.row == parseInt(row) - 2 && x.column == parseInt(column) - 1
            )
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${parseInt(row) - 2}${parseInt(column) - 1}`)
            .classList.add("dot");
        }
      }
      break;
    case "w_bishop":
      for (i = 1; i <= 8 - row; i++) {
        if (parseInt(column) + i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) + i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) + i
                )
                .piece.substring(0, 1) == "b"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) + i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      for (i = 1; i <= 8 - row; i++) {
        if (parseInt(column) - i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) - i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) - i
                )
                .piece.substring(0, 1) == "b"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) - i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      for (i = -1; i >= 1 - row; i--) {
        if (parseInt(column) - i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) - i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) - i
                )
                .piece.substring(0, 1) == "b"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) - i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      for (i = -1; i >= 1 - row; i--) {
        if (parseInt(column) + i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) + i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) + i
                )
                .piece.substring(0, 1) == "b"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) + i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      break;
    case "b_bishop":
      for (i = 1; i <= 8 - row; i++) {
        if (parseInt(column) + i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) + i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) + i
                )
                .piece.substring(0, 1) == "w"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) + i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      for (i = 1; i <= 8 - row; i++) {
        if (parseInt(column) - i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) - i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) - i
                )
                .piece.substring(0, 1) == "w"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) - i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      for (i = -1; i >= 1 - row; i--) {
        if (parseInt(column) - i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) - i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) - i
                )
                .piece.substring(0, 1) == "w"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) - i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      for (i = -1; i >= 1 - row; i--) {
        if (parseInt(column) + i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) + i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) + i
                )
                .piece.substring(0, 1) == "w"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) + i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      break;
    case "w_king":
      if (row > 1) {
        if (
          spots.find((x) => x.row == parseInt(row) - 1 && x.column == column)
            .piece == null ||
          spots
            .find((x) => x.row == parseInt(row) - 1 && x.column == column)
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${parseInt(row) - 1}${column}`)
            .classList.add("dot");
        }
        if (column > 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) - 1 && x.column == parseInt(column) - 1
            ).piece == null ||
            spots
              .find(
                (x) =>
                  x.row == parseInt(row) - 1 && x.column == parseInt(column) - 1
              )
              .piece.substring(0, 1) == "b"
          ) {
            document
              .getElementById(`spot${parseInt(row) - 1}${parseInt(column) - 1}`)
              .classList.add("dot");
          }
        }
        if (column < 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) - 1 && x.column == parseInt(column) + 1
            ).piece == null ||
            spots
              .find(
                (x) =>
                  x.row == parseInt(row) - 1 && x.column == parseInt(column) + 1
              )
              .piece.substring(0, 1) == "b"
          ) {
            document
              .getElementById(`spot${parseInt(row) - 1}${parseInt(column) + 1}`)
              .classList.add("dot");
          }
        }
      }
      if (row < 8) {
        if (
          spots.find((x) => x.row == parseInt(row) + 1 && x.column == column)
            .piece == null ||
          spots
            .find((x) => x.row == parseInt(row) + 1 && x.column == column)
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${parseInt(row) + 1}${column}`)
            .classList.add("dot");
        }
        if (column > 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + 1 && x.column == parseInt(column) - 1
            ).piece == null ||
            spots
              .find(
                (x) =>
                  x.row == parseInt(row) + 1 && x.column == parseInt(column) - 1
              )
              .piece.substring(0, 1) == "b"
          ) {
            document
              .getElementById(`spot${parseInt(row) + 1}${parseInt(column) - 1}`)
              .classList.add("dot");
          }
        }
        if (column < 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + 1 && x.column == parseInt(column) + 1
            ).piece == null ||
            spots
              .find(
                (x) =>
                  x.row == parseInt(row) + 1 && x.column == parseInt(column) + 1
              )
              .piece.substring(0, 1) == "b"
          ) {
            document
              .getElementById(`spot${parseInt(row) + 1}${parseInt(column) + 1}`)
              .classList.add("dot");
          }
        }
      }
      if (column > 1) {
        if (
          spots.find((x) => x.row == row && x.column == parseInt(column) - 1)
            .piece == null ||
          spots
            .find((x) => x.row == row && x.column == parseInt(column) - 1)
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${row}${parseInt(column) - 1}`)
            .classList.add("dot");
        }
      }
      if (column < 8) {
        if (
          spots.find((x) => x.row == row && x.column == parseInt(column) + 1)
            .piece == null ||
          spots
            .find((x) => x.row == row && x.column == parseInt(column) + 1)
            .piece.substring(0, 1) == "b"
        ) {
          document
            .getElementById(`spot${row}${parseInt(column) + 1}`)
            .classList.add("dot");
        }
      }
      if (w_castleLong == true) {
        if (
          spots[1].occupied == false &&
          spots[2].occupied == false &&
          spots[3].occupied == false
        ) {
          document.getElementById("spot13").classList.add("dot");
        }
      }
      if (w_castleShort == true) {
        if (spots[5].occupied == false && spots[6].occupied == false) {
          document.getElementById("spot17").classList.add("dot");
        }
      }
      break;
    case "b_king":
      if (row > 1) {
        if (
          spots.find((x) => x.row == parseInt(row) - 1 && x.column == column)
            .piece == null ||
          spots
            .find((x) => x.row == parseInt(row) - 1 && x.column == column)
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${parseInt(row) - 1}${column}`)
            .classList.add("dot");
        }
        if (column > 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) - 1 && x.column == parseInt(column) - 1
            ).piece == null ||
            spots
              .find(
                (x) =>
                  x.row == parseInt(row) - 1 && x.column == parseInt(column) - 1
              )
              .piece.substring(0, 1) == "w"
          ) {
            document
              .getElementById(`spot${parseInt(row) - 1}${parseInt(column) - 1}`)
              .classList.add("dot");
          }
        }
        if (column < 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) - 1 && x.column == parseInt(column) + 1
            ).piece == null ||
            spots
              .find(
                (x) =>
                  x.row == parseInt(row) - 1 && x.column == parseInt(column) + 1
              )
              .piece.substring(0, 1) == "w"
          ) {
            document
              .getElementById(`spot${parseInt(row) - 1}${parseInt(column) + 1}`)
              .classList.add("dot");
          }
        }
      }
      if (row < 8) {
        if (
          spots.find((x) => x.row == parseInt(row) + 1 && x.column == column)
            .piece == null ||
          spots
            .find((x) => x.row == parseInt(row) + 1 && x.column == column)
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${parseInt(row) + 1}${column}`)
            .classList.add("dot");
        }
        if (column > 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + 1 && x.column == parseInt(column) - 1
            ).piece == null ||
            spots
              .find(
                (x) =>
                  x.row == parseInt(row) + 1 && x.column == parseInt(column) - 1
              )
              .piece.substring(0, 1) == "w"
          ) {
            document
              .getElementById(`spot${parseInt(row) + 1}${parseInt(column) - 1}`)
              .classList.add("dot");
          }
        }
        if (column < 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + 1 && x.column == parseInt(column) + 1
            ).piece == null ||
            spots
              .find(
                (x) =>
                  x.row == parseInt(row) + 1 && x.column == parseInt(column) + 1
              )
              .piece.substring(0, 1) == "w"
          ) {
            document
              .getElementById(`spot${parseInt(row) + 1}${parseInt(column) + 1}`)
              .classList.add("dot");
          }
        }
      }
      if (column > 1) {
        if (
          spots.find((x) => x.row == row && x.column == parseInt(column) - 1)
            .piece == null ||
          spots
            .find((x) => x.row == row && x.column == parseInt(column) - 1)
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${row}${parseInt(column) - 1}`)
            .classList.add("dot");
        }
      }
      if (column < 8) {
        if (
          spots.find((x) => x.row == row && x.column == parseInt(column) + 1)
            .piece == null ||
          spots
            .find((x) => x.row == row && x.column == parseInt(column) + 1)
            .piece.substring(0, 1) == "w"
        ) {
          document
            .getElementById(`spot${row}${parseInt(column) + 1}`)
            .classList.add("dot");
        }
      }
      if (b_castleLong == true) {
        if (
          spots[57].occupied == false &&
          spots[58].occupied == false &&
          spots[59].occupied == false
        ) {
          document.getElementById(`spot83`).classList.add("dot");
        }
      }
      if (b_castleShort == true) {
        if (spots[61].occupied == false && spots[62].occupied == false) {
          document.getElementById(`spot87`).classList.add("dot");
        }
      }
      break;
    case "w_queen":
      for (i = 1; i <= 8 - row; i++) {
        if (
          spots.find((x) => x.row == parseInt(row) + i && x.column == column)
            .occupied != true
        ) {
          document
            .getElementById(`spot${parseInt(row) + i}${column}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == parseInt(row) + i && x.column == column)
              .piece.substring(0, 1) == "b"
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${column}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = -1; i >= 1 - row; i--) {
        if (
          spots.find((x) => x.row == parseInt(row) + i && x.column == column)
            .occupied != true
        ) {
          document
            .getElementById(`spot${parseInt(row) + i}${column}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == parseInt(row) + i && x.column == column)
              .piece.substring(0, 1) == "b"
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${column}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = 1; i <= 8 - column; i++) {
        if (
          spots.find((x) => x.row == row && x.column == parseInt(column) + i)
            .occupied != true
        ) {
          document
            .getElementById(`spot${row}${parseInt(column) + i}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == row && x.column == parseInt(column) + i)
              .piece.substring(0, 1) == "b"
          ) {
            document
              .getElementById(`spot${row}${parseInt(column) + i}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = -1; i >= 1 - column; i--) {
        if (
          spots.find((x) => x.row == row && x.column == parseInt(column) + i)
            .occupied != true
        ) {
          document
            .getElementById(`spot${row}${parseInt(column) + i}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == row && x.column == parseInt(column) + i)
              .piece.substring(0, 1) == "b"
          ) {
            document
              .getElementById(`spot${row}${parseInt(column) + i}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = 1; i <= 8 - row; i++) {
        if (parseInt(column) + i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) + i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) + i
                )
                .piece.substring(0, 1) == "b"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) + i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      for (i = 1; i <= 8 - row; i++) {
        if (parseInt(column) - i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) - i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) - i
                )
                .piece.substring(0, 1) == "b"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) - i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      for (i = -1; i >= 1 - row; i--) {
        if (parseInt(column) - i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) - i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) - i
                )
                .piece.substring(0, 1) == "b"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) - i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      for (i = -1; i >= 1 - row; i--) {
        if (parseInt(column) + i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) + i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) + i
                )
                .piece.substring(0, 1) == "b"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) + i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      break;
    case "b_queen":
      for (i = 1; i <= 8 - row; i++) {
        if (
          spots.find((x) => x.row == parseInt(row) + i && x.column == column)
            .occupied != true
        ) {
          document
            .getElementById(`spot${parseInt(row) + i}${column}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == parseInt(row) + i && x.column == column)
              .piece.substring(0, 1) == "w"
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${column}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = -1; i >= 1 - row; i--) {
        if (
          spots.find((x) => x.row == parseInt(row) + i && x.column == column)
            .occupied != true
        ) {
          document
            .getElementById(`spot${parseInt(row) + i}${column}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == parseInt(row) + i && x.column == column)
              .piece.substring(0, 1) == "w"
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${column}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = 1; i <= 8 - column; i++) {
        if (
          spots.find((x) => x.row == row && x.column == parseInt(column) + i)
            .occupied != true
        ) {
          document
            .getElementById(`spot${row}${parseInt(column) + i}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == row && x.column == parseInt(column) + i)
              .piece.substring(0, 1) == "w"
          ) {
            document
              .getElementById(`spot${row}${parseInt(column) + i}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = -1; i >= 1 - column; i--) {
        if (
          spots.find((x) => x.row == row && x.column == parseInt(column) + i)
            .occupied != true
        ) {
          document
            .getElementById(`spot${row}${parseInt(column) + i}`)
            .classList.add("dot");
        } else {
          if (
            spots
              .find((x) => x.row == row && x.column == parseInt(column) + i)
              .piece.substring(0, 1) == "w"
          ) {
            document
              .getElementById(`spot${row}${parseInt(column) + i}`)
              .classList.add("dot");
          }
          break;
        }
      }
      for (i = 1; i <= 8 - row; i++) {
        if (parseInt(column) + i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) + i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) + i
                )
                .piece.substring(0, 1) == "w"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) + i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      for (i = 1; i <= 8 - row; i++) {
        if (parseInt(column) - i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) - i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) - i
                )
                .piece.substring(0, 1) == "w"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) - i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      for (i = -1; i >= 1 - row; i--) {
        if (parseInt(column) - i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) - i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) - i
                )
                .piece.substring(0, 1) == "w"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) - i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      for (i = -1; i >= 1 - row; i--) {
        if (parseInt(column) + i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).occupied != true
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) + i}`)
              .classList.add("dot");
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) + i
                )
                .piece.substring(0, 1) == "w"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) + i}`
                )
                .classList.add("dot");
            }
            break;
          }
        }
      }
      break;
  }
}

function w_pawn(row, column) {
  if (
    selectedSpot.column == column &&
    selectedSpot.row - row == -1 &&
    spots.find((x) => x.row == row && x.column == column).occupied != true
  ) {
    if (row == 8) {
      promote(row, column, "w");
    }
    movePiece(row, column);
  } else if (
    selectedSpot.column == column &&
    selectedSpot.row == 2 &&
    row == 4 &&
    spots.find((x) => x.row == row && x.column == column).occupied != true &&
    spots.find((x) => x.row == 3 && x.column == column).occupied != true
  ) {
    b_en_passant.row = parseInt(row) - 1;
    b_en_passant.column = column;
    movePiece(row, column);
  } else if (
    Math.abs(selectedSpot.column - column) == 1 &&
    selectedSpot.row - row == -1 &&
    spots.find((x) => x.row == row && x.column == column).occupied == true
  ) {
    if (row == 8) {
      promote(row, column, "w");
    }
    movePiece(row, column);
  } else if (
    w_en_passant.row == row &&
    w_en_passant.column == column &&
    selectedSpot.row == parseInt(w_en_passant.row) - 1 &&
    1 == Math.abs(parseInt(w_en_passant.column) - selectedSpot.column)
  ) {
    spots.find(
      (x) =>
        x.row == parseInt(w_en_passant.row) - 1 &&
        x.column == w_en_passant.column
    ).piece = null;
    movePiece(row, column);
  }
}

function b_pawn(row, column) {
  if (
    selectedSpot.column == column &&
    selectedSpot.row - row == 1 &&
    spots.find((x) => x.row == row && x.column == column).occupied != true
  ) {
    if (row == 1) {
      promote(row, column, "b");
    }
    movePiece(row, column);
  } else if (
    selectedSpot.column == column &&
    selectedSpot.row == 7 &&
    row == 5 &&
    spots.find((x) => x.row == row && x.column == column).occupied != true &&
    spots.find((x) => x.row == 6 && x.column == column).occupied != true
  ) {
    w_en_passant.row = parseInt(row) + 1;
    w_en_passant.column = column;
    movePiece(row, column);
  } else if (
    Math.abs(selectedSpot.column - column) == 1 &&
    selectedSpot.row - row == 1 &&
    spots.find((x) => x.row == row && x.column == column).occupied == true
  ) {
    if (row == 1) {
      promote(row, column, "b");
    }
    movePiece(row, column);
  } else if (
    b_en_passant.row == row &&
    b_en_passant.column == column &&
    selectedSpot.row == parseInt(b_en_passant.row) + 1 &&
    1 == Math.abs(parseInt(b_en_passant.column) - selectedSpot.column)
  ) {
    spots.find(
      (x) =>
        x.row == parseInt(b_en_passant.row) + 1 &&
        x.column == b_en_passant.column
    ).piece = null;
    movePiece(row, column);
  }
}

function rook(row, column) {
  if (selectedSpot.row == row) {
    if (selectedSpot.column > column) {
      var increment = -1;
    } else {
      var increment = 1;
    }
    for (i = 1; i < Math.abs(selectedSpot.column - column); i++) {
      if (
        spots.find(
          (x) =>
            x.row == row &&
            x.column == parseInt(selectedSpot.column) + i * increment
        ).occupied == true
      ) {
        return;
      }
    }
    if (selectedSpot.piece.substring(0, 1) == "w") {
      if (selectedSpot.column == "1") {
        w_castleLong = false;
      } else if (selectedSpot.column == "8") {
        w_castleShort = false;
      }
    } else if (selectedSpot.piece.substring(0, 1) == "b") {
      if (selectedSpot.column == "1") {
        b_castleLong = false;
      } else if (selectedSpot.column == "8") {
        b_castleShort = false;
      }
    }
    movePiece(row, column);
  } else if (selectedSpot.column == column) {
    if (selectedSpot.row > row) {
      var increment = -1;
    } else {
      var increment = 1;
    }
    for (i = 1; i < Math.abs(selectedSpot.row - row); i++) {
      if (
        spots.find(
          (x) =>
            x.column == column &&
            x.row == parseInt(selectedSpot.row) + i * increment
        ).occupied == true
      ) {
        return;
      }
    }
    if (selectedSpot.piece.substring(0, 1) == "w") {
      if (selectedSpot.column == "1") {
        w_castleLong = false;
      } else if (selectedSpot.column == "8") {
        w_castleShort = false;
      }
    } else if (selectedSpot.piece.substring(0, 1) == "b") {
      if (selectedSpot.column == "1") {
        b_castleLong = false;
      } else if (selectedSpot.column == "8") {
        b_castleShort = false;
      }
    }
    movePiece(row, column);
  }
}

function knight(row, column) {
  if (
    Math.abs(selectedSpot.row - row) == 2 &&
    Math.abs(selectedSpot.column - column) == 1
  ) {
    movePiece(row, column);
  }
  if (
    Math.abs(selectedSpot.row - row) == 1 &&
    Math.abs(selectedSpot.column - column) == 2
  ) {
    movePiece(row, column);
  }
}

function bishop(row, column) {
  if (
    Math.abs(selectedSpot.row - row) == Math.abs(selectedSpot.column - column)
  ) {
    if (selectedSpot.row > row) {
      var incrementRow = -1;
    } else {
      var incrementRow = 1;
    }
    if (selectedSpot.column > column) {
      var incrementColumn = -1;
    } else {
      var incrementColumn = 1;
    }
    for (i = 1; i < Math.abs(selectedSpot.column - column); i++) {
      if (
        spots.find(
          (x) =>
            x.row == parseInt(selectedSpot.row) + i * incrementRow &&
            x.column == parseInt(selectedSpot.column) + i * incrementColumn
        ).occupied == true
      ) {
        return;
      }
    }
    movePiece(row, column);
  }
}

function w_king(row, column) {
  if (
    Math.abs(selectedSpot.row - row) <= 1 &&
    Math.abs(selectedSpot.column - column) <= 1
  ) {
    w_castleLong = false;
    w_castleShort = false;
    movePiece(row, column);
  } else if (w_castleLong == true && row == "1" && column == "3") {
    if (
      spots[1].occupied == false &&
      spots[2].occupied == false &&
      spots[3].occupied == false
    ) {
      spots[0].piece = null;
      spots[2].piece = "w_king";
      spots[3].piece = "w_rook";
      spots[4].piece = null;
      reloadPieces();
    }
  } else if (w_castleShort == true && row == "1" && column == "7") {
    if (spots[5].occupied == false && spots[6].occupied == false) {
      spots[4].piece = null;
      spots[5].piece = "w_rook";
      spots[6].piece = "w_king";
      spots[7].piece = null;
      reloadPieces();
    }
  }
}

function b_king(row, column) {
  if (
    Math.abs(selectedSpot.row - row) <= 1 &&
    Math.abs(selectedSpot.column - column) <= 1
  ) {
    b_castleLong = false;
    b_castleShort = false;
    movePiece(row, column);
  } else if (b_castleLong == true && row == "8" && column == "3") {
    if (
      spots[57].occupied == false &&
      spots[58].occupied == false &&
      spots[59].occupied == false
    ) {
      spots[56].piece = null;
      spots[58].piece = "b_king";
      spots[59].piece = "b_rook";
      spots[60].piece = null;
      reloadPieces();
    }
  } else if (b_castleShort == true && row == "8" && column == "7") {
    if (spots[61].occupied == false && spots[62].occupied == false) {
      spots[60].piece = null;
      spots[61].piece = "b_rook";
      spots[62].piece = "b_king";
      spots[63].piece = null;
      reloadPieces();
    }
  }
}

function queen(row, column) {
  if (selectedSpot.row == row) {
    if (selectedSpot.column > column) {
      var increment = -1;
    } else {
      var increment = 1;
    }
    for (i = 1; i < Math.abs(selectedSpot.column - column); i++) {
      if (
        spots.find(
          (x) =>
            x.row == row &&
            x.column == parseInt(selectedSpot.column) + i * increment
        ).occupied == true
      ) {
        return;
      }
    }
    movePiece(row, column);
  } else if (selectedSpot.column == column) {
    if (selectedSpot.row > row) {
      var increment = -1;
    } else {
      var increment = 1;
    }
    for (i = 1; i < Math.abs(selectedSpot.row - row); i++) {
      if (
        spots.find(
          (x) =>
            x.column == column &&
            x.row == parseInt(selectedSpot.row) + i * increment
        ).occupied == true
      ) {
        return;
      }
    }
    movePiece(row, column);
  } else if (
    Math.abs(selectedSpot.row - row) == Math.abs(selectedSpot.column - column)
  ) {
    if (selectedSpot.row > row) {
      var incrementRow = -1;
    } else {
      var incrementRow = 1;
    }
    if (selectedSpot.column > column) {
      var incrementColumn = -1;
    } else {
      var incrementColumn = 1;
    }
    for (i = 1; i < Math.abs(selectedSpot.column - column); i++) {
      if (
        spots.find(
          (x) =>
            x.row == parseInt(selectedSpot.row) + i * incrementRow &&
            x.column == parseInt(selectedSpot.column) + i * incrementColumn
        ).occupied == true
      ) {
        return;
      }
    }
    movePiece(row, column);
  }
}

function movePiece(row, column) {
  let moveTo = spots.find((x) => x.row == row && x.column == column);
  if (moveTo.piece != null) {
    if (moveTo.piece.substring(0, 1) == "b") {
      document.getElementById(
        "w_captures"
      ).innerHTML += `<img style="height: 4vh" src="assets/${moveTo.piece}.png"/>`;
    }
    if (moveTo.piece.substring(0, 1) == "w") {
      document.getElementById(
        "b_captures"
      ).innerHTML += `<img style="height: 4vh" src="assets/${moveTo.piece}.png"/>`;
    }
  }
  moveTo.piece = selectedSpot.piece;
  selectedSpot.piece = null;
  reloadPieces();
}

function promote(row, column, player) {
  ready = false;
  document.getElementById("rook").src = `assets/${player}_rook.png`;
  document.getElementById("knight").src = `assets/${player}_knight.png`;
  document.getElementById("bishop").src = `assets/${player}_bishop.png`;
  document.getElementById("queen").src = `assets/${player}_queen.png`;
  document.getElementById("promote").style.display = "block";
  globalRow = row;
  globalColumn = column;
}

function promoteTo(element) {
  let row = globalRow;
  let column = globalColumn;
  if (currentPlayer == "b") {
    console.log(row);
    spots.find(
      (x) => x.row == row && x.column == column
    ).piece = `w_${element.id}`;
    document.getElementById(
      `spot${row}${column}`
    ).style.backgroundImage = `url(assets/w_${element.id}.png)`;
  }
  if (currentPlayer == "w") {
    console.log(row);
    spots.find(
      (x) => x.row == row && x.column == column
    ).piece = `b_${element.id}`;
    document.getElementById(
      `spot${row}${column}`
    ).style.backgroundImage = `url(assets/b_${element.id}.png)`;
  }
  document.getElementById("promote").style.display = "none";
  ready = true;
}

function reloadPieces() {
  let dots = document.getElementsByClassName("dot");
  for (i = dots.length - 1; i >= 0; i--) {
    dots[i].classList.remove("dot");
  }
  if (w_en_passant.row != "") w_en_passant.age++;
  if (b_en_passant.row != "") b_en_passant.age++;
  if (w_en_passant.age == 2) w_en_passant = { row: "", column: "", age: "0" };
  if (b_en_passant.age == 2) b_en_passant = { row: "", column: "", age: "0" };
  let blackKing = false;
  let whiteKing = false;
  for (i = 0; i < spots.length; i++) {
    if (spots[i].piece == "b_king") blackKing = true;
    if (spots[i].piece == "w_king") whiteKing = true;
    if (spots[i].piece != null) spots[i].occupied = true;
    if (spots[i].piece == null) spots[i].occupied = false;
    document.getElementById(
      `spot${spots[i].row}${spots[i].column}`
    ).style.backgroundImage = `url(assets/${spots[i].piece}.png)`;
  }
  if (!blackKing) {
    alert("White Wins!");
  }
  if (!whiteKing) {
    alert("Black Wins!");
  }
  if (currentPlayer == "w") {
    currentPlayer = "b";
  } else {
    currentPlayer = "w";
  }
}

function load() {
  for (i = 0; i < spots.length; i++) {
    if (spots[i].occupied != false) {
      document.getElementById(
        `spot${spots[i].row}${spots[i].column}`
      ).style.backgroundImage = `url(assets/${spots[i].piece}.png)`;
    }
  }
  document.getElementById("wrapper").style.transform = "rotateX(180deg)";
  let loop = document.getElementsByClassName("spot");
  for (i = loop.length - 1; i >= 0; i--) {
    loop[i].classList.add("rotate");
  }
  loop = document.getElementsByClassName("row");
  for (i = loop.length - 1; i >= 0; i--) {
    loop[i].classList.add("row-flipped");
  }
}
