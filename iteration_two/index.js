var ready = true;
var row;
var column;
var currentPlayer = "w";
var selectedSpot = { row: "", column: "", piece: "" };
var w_en_passant = { row: "", column: "", age: "0" };
var b_en_passant = { row: "", column: "", age: "0" };
var w_castleLong = true;
var w_castleShort = true;
var b_castleLong = true;
var b_castleShort = true;

function load() {
  document.body.style.height = `${window.innerHeight}px`;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    let headTitle = document.querySelector("head");
    let setFavicon = document.createElement("link");
    setFavicon.setAttribute("rel", "shortcut icon");
    setFavicon.setAttribute("href", "assets/w_king.png");
    headTitle.appendChild(setFavicon);
  }
  for (i = 0; i < spots.length; i++) {
    document.getElementById(
      `spot${spots[i].row}${spots[i].column}`
    ).style.backgroundImage = `url(assets/${spots[i].piece}.png)`;
  }
}

function spotClicked(element) {
  if (!ready) return;
  row = element.id.substr(4, 1);
  column = element.id.substr(5, 1);
  if (spots.find((x) => x.row == row && x.column == column).piece != "") {
    if (
      spots
        .find((x) => x.row == row && x.column == column)
        .piece.substring(0, 1) == currentPlayer
    ) {
      let dots = document.getElementsByClassName("dot");
      for (i = dots.length - 1; i >= 0; i--) {
        dots[i].classList.remove("dot");
      }
    }
    if (
      spots
        .find((x) => x.row == row && x.column == column)
        .piece.substring(0, 1) != currentPlayer
    ) {
      move(selectedSpot.piece);
    } else {
      select();
    }
  } else {
    if (selectedSpot.row == "") return;
    move(selectedSpot.piece);
  }
}

function select() {
  if (selectedSpot.row != "") {
    document.getElementById(
      `spot${selectedSpot.row}${selectedSpot.column}`
    ).style.filter = "";
  }
  if (parseInt(row) % 2 != parseInt(column) % 2) {
    document.getElementById(`spot${row}${column}`).style.filter =
      "sepia(1) brightness(1.75)";
  } else {
    document.getElementById(`spot${row}${column}`).style.filter =
      "sepia(1) brightness(1.15)";
  }
  selectedSpot.row = row;
  selectedSpot.column = column;
  selectedSpot.piece = spots.find(
    (x) => x.row == row && x.column == column
  ).piece;
  let rowMin = -1;
  let rowMax = 1;
  let colMin = -1;
  let colMax = 1;
  switch (spots.find((x) => x.row == row && x.column == column).piece) {
    case "w_pawn":
      if (
        spots.find((x) => x.row == parseInt(row) + 1 && x.column == column)
          .piece == ""
      ) {
        document
          .getElementById(`spot${parseInt(row) + 1}${column}`)
          .classList.add("dot");
        if (
          row == "2" &&
          spots.find((x) => x.row == 4 && x.column == column).piece == ""
        ) {
          document
            .getElementById(`spot4${column}`)
            .classList.add("dot", "bEnPassant");
        }
      }
      if (
        column != 1 &&
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
      if (
        column != 8 &&
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
      if (
        row == parseInt(w_en_passant.row) - 1 &&
        1 == Math.abs(parseInt(w_en_passant.column) - parseInt(column))
      ) {
        document
          .getElementById(`spot${w_en_passant.row}${w_en_passant.column}`)
          .classList.add("dot");
      }
      break;
    case "b_pawn":
      if (
        spots.find((x) => x.row == parseInt(row) - 1 && x.column == column)
          .piece == ""
      ) {
        document
          .getElementById(`spot${parseInt(row) - 1}${column}`)
          .classList.add("dot");
        if (
          row == "7" &&
          spots.find((x) => x.row == 5 && x.column == column).piece == ""
        ) {
          document
            .getElementById(`spot5${column}`)
            .classList.add("dot", "wEnPassant");
        }
      }
      if (
        column != 1 &&
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
      if (
        column != 8 &&
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
            .piece == ""
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
            .piece == ""
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
            .piece == ""
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
            .piece == ""
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
            .piece == ""
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
            .piece == ""
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
            .piece == ""
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
            .piece == ""
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
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          if (
            j == 0 ||
            i == 0 ||
            Math.abs(i) == Math.abs(j) ||
            parseInt(row) + i > 8 ||
            parseInt(row) + i < 1 ||
            parseInt(column) + j > 8 ||
            parseInt(column) + j < 1
          ) {
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) + j
                )
                .piece.substring(0, 1) != "w"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) + j}`
                )
                .classList.add("dot");
            }
          }
        }
      }
      break;
    case "b_knight":
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          if (
            j == 0 ||
            i == 0 ||
            Math.abs(i) == Math.abs(j) ||
            parseInt(row) + i > 8 ||
            parseInt(row) + i < 1 ||
            parseInt(column) + j > 8 ||
            parseInt(column) + j < 1
          ) {
          } else {
            if (
              spots
                .find(
                  (x) =>
                    x.row == parseInt(row) + i &&
                    x.column == parseInt(column) + j
                )
                .piece.substring(0, 1) != "b"
            ) {
              document
                .getElementById(
                  `spot${parseInt(row) + i}${parseInt(column) + j}`
                )
                .classList.add("dot");
            }
          }
        }
      }
      break;
    case "w_bishop":
      for (i = 1; i <= 8 - parseInt(row); i++) {
        if (parseInt(column) + i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      for (i = -1; i >= 1 - parseInt(row); i--) {
        if (parseInt(column) + i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      for (i = 1; i <= 8 - parseInt(row); i++) {
        if (parseInt(column) - i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      for (i = -1; i >= 1 - parseInt(row); i--) {
        if (parseInt(column) - i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      break;
    case "b_bishop":
      for (i = 1; i <= 8 - parseInt(row); i++) {
        if (parseInt(column) + i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      for (i = -1; i >= 1 - parseInt(row); i--) {
        if (parseInt(column) + i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      for (i = 1; i <= 8 - parseInt(row); i++) {
        if (parseInt(column) - i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      for (i = -1; i >= 1 - parseInt(row); i--) {
        if (parseInt(column) - i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      break;
    case "w_queen":
      for (i = 1; i <= 8 - row; i++) {
        if (
          spots.find((x) => x.row == parseInt(row) + i && x.column == column)
            .piece == ""
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
            .piece == ""
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
            .piece == ""
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
            .piece == ""
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
      for (i = 1; i <= 8 - parseInt(row); i++) {
        if (parseInt(column) + i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      for (i = -1; i >= 1 - parseInt(row); i--) {
        if (parseInt(column) + i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      for (i = 1; i <= 8 - parseInt(row); i++) {
        if (parseInt(column) - i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      for (i = -1; i >= 1 - parseInt(row); i--) {
        if (parseInt(column) - i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      break;
    case "b_queen":
      for (i = 1; i <= 8 - row; i++) {
        if (
          spots.find((x) => x.row == parseInt(row) + i && x.column == column)
            .piece == ""
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
            .piece == ""
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
            .piece == ""
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
            .piece == ""
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
      for (i = 1; i <= 8 - parseInt(row); i++) {
        if (parseInt(column) + i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      for (i = -1; i >= 1 - parseInt(row); i--) {
        if (parseInt(column) + i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) + i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      for (i = 1; i <= 8 - parseInt(row); i++) {
        if (parseInt(column) - i >= 1) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      for (i = -1; i >= 1 - parseInt(row); i--) {
        if (parseInt(column) - i <= 8) {
          if (
            spots.find(
              (x) =>
                x.row == parseInt(row) + i && x.column == parseInt(column) - i
            ).piece == ""
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
              break;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
      break;
    case "w_king":
      if (row == 1) {
        rowMin = 0;
      } else if (row == 8) {
        rowMax = 0;
      }
      if (column == 1) {
        colMin = 0;
      } else if (column == 8) {
        colMax = 0;
      }
      for (i = rowMin; i <= rowMax; i++) {
        for (j = colMin; j <= colMax; j++) {
          if (
            spots
              .find(
                (x) =>
                  x.row == parseInt(row) + i && x.column == parseInt(column) + j
              )
              .piece.substring(0, 1) != "w"
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) + j}`)
              .classList.add("dot");
          }
        }
      }
      if (
        w_castleLong == true &&
        spots[1].piece == "" &&
        spots[2].piece == "" &&
        spots[3].piece == ""
      ) {
        document.getElementById(`spot13`).classList.add("dot", "wCastleLong");
      }
      if (
        w_castleShort == true &&
        spots[5].piece == "" &&
        spots[6].piece == ""
      ) {
        document.getElementById(`spot17`).classList.add("dot", "wCastleShort");
      }
      break;
    case "b_king":
      if (row == 1) {
        rowMin = 0;
      } else if (row == 8) {
        rowMax = 0;
      }
      if (column == 1) {
        colMin = 0;
      } else if (column == 8) {
        colMax = 0;
      }
      for (i = rowMin; i <= rowMax; i++) {
        for (j = colMin; j <= colMax; j++) {
          if (
            spots
              .find(
                (x) =>
                  x.row == parseInt(row) + i && x.column == parseInt(column) + j
              )
              .piece.substring(0, 1) != "b"
          ) {
            document
              .getElementById(`spot${parseInt(row) + i}${parseInt(column) + j}`)
              .classList.add("dot");
          }
        }
      }
      if (
        b_castleLong == true &&
        spots[57].piece == "" &&
        spots[58].piece == "" &&
        spots[59].piece == ""
      ) {
        document.getElementById(`spot83`).classList.add("dot", "bCastleLong");
      }
      if (
        b_castleShort == true &&
        spots[61].piece == "" &&
        spots[62].piece == ""
      ) {
        document.getElementById(`spot87`).classList.add("dot", "bCastleShort");
      }
      break;
  }
}

function move(piece) {
  if (
    document.getElementById(`spot${row}${column}`).classList.contains("dot")
  ) {
    let moveTo = spots.find((x) => x.row == row && x.column == column);
    if (moveTo.piece != "") {
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
    if (piece == "w_king") {
      if (
        document
          .getElementById(`spot${row}${column}`)
          .classList.contains("wCastleLong")
      ) {
        spots[0].piece = "";
        spots[2].piece = "w_king";
        spots[3].piece = "w_rook";
        spots[4].piece = "";
        refresh();
        return;
      }
      if (
        document
          .getElementById(`spot${row}${column}`)
          .classList.contains("wCastleShort")
      ) {
        spots[4].piece = "";
        spots[5].piece = "w_rook";
        spots[6].piece = "w_king";
        spots[7].piece = "";
        refresh();
        return;
      }
    } else if (piece == "b_king") {
      if (
        document
          .getElementById(`spot${row}${column}`)
          .classList.contains("bCastleLong")
      ) {
        spots[56].piece = "";
        spots[58].piece = "b_king";
        spots[59].piece = "b_rook";
        spots[60].piece = "";
        refresh();
        return;
      }
      if (
        document
          .getElementById(`spot${row}${column}`)
          .classList.contains("bCastleShort")
      ) {
        spots[60].piece = "";
        spots[61].piece = "b_rook";
        spots[62].piece = "b_king";
        spots[63].piece = "";
        refresh();
        return;
      }
    }
    if (
      piece == "w_pawn" &&
      w_en_passant.row == row &&
      w_en_passant.column == column &&
      selectedSpot.row == parseInt(w_en_passant.row) - 1 &&
      1 == Math.abs(parseInt(w_en_passant.column) - selectedSpot.column)
    ) {
      spots.find(
        (x) => x.row == selectedSpot.row && x.column == selectedSpot.column
      ).piece = "";
      spots.find(
        (x) =>
          x.row == parseInt(w_en_passant.row) - 1 &&
          x.column == w_en_passant.column
      ).piece = "";
      spots.find(
        (x) => x.row == w_en_passant.row && x.column == w_en_passant.column
      ).piece = "w_pawn";
      document.getElementById(
        "w_captures"
      ).innerHTML += `<img style="height: 4vh" src="assets/b_pawn.png"/>`;
      refresh();
    } else if (
      piece == "b_pawn" &&
      b_en_passant.row == row &&
      b_en_passant.column == column &&
      selectedSpot.row == parseInt(b_en_passant.row) + 1 &&
      1 == Math.abs(parseInt(b_en_passant.column) - selectedSpot.column)
    ) {
      spots.find(
        (x) => x.row == selectedSpot.row && x.column == selectedSpot.column
      ).piece = "";
      spots.find(
        (x) =>
          x.row == parseInt(b_en_passant.row) + 1 &&
          x.column == b_en_passant.column
      ).piece = "";
      spots.find(
        (x) => x.row == b_en_passant.row && x.column == b_en_passant.column
      ).piece = "b_pawn";
      document.getElementById(
        "b_captures"
      ).innerHTML += `<img style="height: 4vh" src="assets/w_pawn.png"/>`;
      refresh();
    } else if (piece == "w_pawn" && moveTo.row == 8) {
      console.log(row, column);
      ready = false;
      spots.find(
        (x) => x.row == selectedSpot.row && x.column == selectedSpot.column
      ).piece = "";
      document.getElementById("rook").src = "assets/w_rook.png";
      document.getElementById("knight").src = "assets/w_knight.png";
      document.getElementById("bishop").src = "assets/w_bishop.png";
      document.getElementById("queen").src = "assets/w_queen.png";
      document.getElementById("promote").style.display = "block";
    } else if (piece == "b_pawn" && moveTo.row == 1) {
      console.log(row, column);
      ready = false;
      spots.find(
        (x) => x.row == selectedSpot.row && x.column == selectedSpot.column
      ).piece = "";
      document.getElementById("rook").src = "assets/b_rook.png";
      document.getElementById("knight").src = "assets/b_knight.png";
      document.getElementById("bishop").src = "assets/b_bishop.png";
      document.getElementById("queen").src = "assets/b_queen.png";
      document.getElementById("promote").style.display = "block";
    } else {
      if (
        document
          .getElementById(`spot${row}${column}`)
          .classList.contains("wEnPassant")
      ) {
        w_en_passant = { row: parseInt(row) + 1, column: column, age: "0" };
      }
      if (
        document
          .getElementById(`spot${row}${column}`)
          .classList.contains("bEnPassant")
      ) {
        b_en_passant = { row: parseInt(row) - 1, column: column, age: "0" };
      }
      moveTo.piece = selectedSpot.piece;
      spots.find(
        (x) => x.row == selectedSpot.row && x.column == selectedSpot.column
      ).piece = "";
      refresh();
    }
  }
}

function promoteTo(element) {
  if (currentPlayer == "w") {
    spots.find(
      (x) => x.row == row && x.column == column
    ).piece = `w_${element.id}`;
    document.getElementById(
      `spot${row}${column}`
    ).style.backgroundImage = `url(assets/w_${element.id}.png)`;
  }
  if (currentPlayer == "b") {
    spots.find(
      (x) => x.row == row && x.column == column
    ).piece = `b_${element.id}`;
    document.getElementById(
      `spot${row}${column}`
    ).style.backgroundImage = `url(assets/b_${element.id}.png)`;
  }
  document.getElementById("promote").style.display = "none";
  refresh();
  ready = true;
}

function refresh() {
  let dots = document.getElementsByClassName("dot");
  for (i = dots.length - 1; i >= 0; i--) {
    dots[i].classList.remove(
      "dot",
      "wCastleLong",
      "wCastleShort",
      "bCastleLong",
      "bCastleShort",
      "wEnPassant",
      "bEnPassant"
    );
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
    document.getElementById(
      `spot${spots[i].row}${spots[i].column}`
    ).style.backgroundImage = `url(assets/${spots[i].piece}.png)`;
  }
  if (!blackKing) {
    alert("White Wins!");
    ready = false;
  }
  if (!whiteKing) {
    alert("Black Wins!");
    ready = false;
  }
  if (currentPlayer == "w") {
    document.getElementById("turn").innerText = "Black's Turn";
    currentPlayer = "b";
  } else {
    document.getElementById("turn").innerText = "White's Turn";
    currentPlayer = "w";
  }
}
