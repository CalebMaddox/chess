class Game {
  constructor(startingPosition) {
    this.boardSize = {
      fileCount: startingPosition[0].length,
      rankCount: startingPosition.length,
    };

    this.history = [
      { move: null, position: startingPosition, highlighted: [] },
    ];

    this.position = startingPosition;

    this.currentPlayer = "white";

    this.captures = {
      white: [],
      black: [],
    };

    this.settings = {
      coordinates: false,
      largePieces: false,
      highContrast: false,
      fontSize: false,
      animations: true,
      pieceStyle: "neo",
      moveNums: "always",
      scrollHistory: "near bottom",
      moveNotation: {
        capture: "x",
        check: "+",
        checkmate: "#",
        disambiguityWhenNotNecessary: false,
        enPassant: "e.p.",
        promotion: "/PIECE",
        shortCastle: "0-0",
        longCastle: "0-0-0",
      },
    };

    this.state = {
      // variables that are only temporary and should be CLEARED once a player's turn ends
      currentlyHighlighted: [],
      currentDots: [],
      selected: { file: null, rank: null },
      possibleMoves: [],
      enPassantSquare: { file: null, rank: null },
      paused: false,
      promotionSquare: { file: null, rank: null },
    };

    this.castlingPossibilities = {
      // #region **explanation
      // takes into consideration the following:
      //  - if king has moved
      //  - if rooks have moved
      // the following must be checked elsewhere:
      //  - if spaces between king and rook are empty
      //  - if king isn't under check
      //  - if spaces king would physically move through or to are attacked by opponent
      // #endregion **explanation
      white: { short: true, long: true },
      black: { short: true, long: true },
    };
  }

  handlePageLoad() {
    display(this.position, this.settings.pieceStyle);
  }

  spotClicked(el) {
    let rank = parseInt(el.dataset.rank);
    let file = letterToNum(el.dataset.file);

    let pieceA = this.getPieceAt(file, rank);

    let clickedPieceIsFriendly = isFriendly(pieceA, this.currentPlayer);

    if (clickedPieceIsFriendly) {
      this.selectSpot({ file: file, rank: rank });
    } else {
      if (this.state.selected.file !== null) {
        let selectedSpotsPossibleMoves =
          this.state.possibleMoves[
            `${this.state.selected.file}${this.state.selected.rank}`
          ];
        let moveIs = selectedSpotsPossibleMoves.filter(
          (move) => move.to.file === file && move.to.rank === rank
        )[0];

        if (moveIs) {
          this.commitMove(
            { file: this.state.selected.file, rank: this.state.selected.rank },
            moveIs.to,
            moveIs.specialProps
          );
          this.switchPlayer();
          display(this.position, this.settings.pieceStyle);
        }
      }
    }
  }

  selectSpot(spot) {
    if (this.state.paused) return;

    let piece = this.getPieceAt(spot.file, spot.rank);
    let moves = this.getPossibleMoves(spot, piece, false, true);

    this.state.possibleMoves[`${spot.file}${spot.rank}`] = moves; // stores possible moves in "memory", reducing redundant logic

    let dots = moves.map((movePossibility) => {
      return movePossibility.to;
    });

    this.state.currentDots = drawDots(dots, this.state.currentDots);
    this.state.currentlyHighlighted = highlight(
      [{ rank: spot.rank, file: spot.file }],
      this.state.currentlyHighlighted
    );

    this.state.selected = { file: spot.file, rank: spot.rank };
  }

  getPossibleMoves(spot, piece, preventLooping, useStoredValue) {
    if (useStoredValue) {
      let storedValue = this.state.possibleMoves[`${spot.file}${spot.rank}`];
      if (piece === piece && storedValue) {
        return storedValue; // if the same spot and piece have been checked this turn already, just return the previous evaluation
      }
    }

    let patternsToTry = piecesMoves[piece === "P" ? "P" : piece.toLowerCase()]; // if piece is a white pawn, keep capitalization (specifying team) ; otherwise, all pieces have the same move patterns for both teams

    let sequencesToTest = [];
    let checkedMoves = [];

    patternsToTry.forEach((move) => {
      let moveList;
      switch (move.pattern) {
        case "diagonal":
          moveList = [[], []];

          for (i = 1; i <= this.boardSize.fileCount - spot.file; i++) {
            // + +
            if (spot.rank + i <= this.boardSize.rankCount) {
              moveList[0].push({
                to: {
                  file: spot.file + i,
                  rank: spot.rank + i,
                },
                conditions: move.conditions,
              });
            }
            // + -
            if (spot.rank - i >= 1) {
              moveList[1].push({
                to: {
                  file: spot.file + i,
                  rank: spot.rank - i,
                },
                conditions: move.conditions,
              });
            }
          }

          sequencesToTest.push(moveList[0], moveList[1]);
          moveList = [[], []];

          for (i = 1; i <= spot.file - 1; i++) {
            // - +
            if (spot.rank + i <= this.boardSize.rankCount) {
              moveList[0].push({
                to: {
                  file: spot.file - i,
                  rank: spot.rank + i,
                },
                conditions: move.conditions,
              });
            }
            // - -
            if (spot.rank - i >= 1) {
              moveList[1].push({
                to: {
                  file: spot.file - i,
                  rank: spot.rank - i,
                },
                conditions: move.conditions,
              });
            }
          }

          sequencesToTest.push(moveList[0], moveList[1]);

          break;
        case "straight line":
          moveList = [];

          // + 0
          for (i = 1; i <= this.boardSize.fileCount - spot.file; i++) {
            moveList.push({
              to: { file: spot.file + i, rank: spot.rank },
              conditions: move.conditions,
            });
          }

          sequencesToTest.push(moveList);
          moveList = [];

          // - 0
          for (i = 1; i <= spot.file - 1; i++) {
            moveList.push({
              to: { file: spot.file - i, rank: spot.rank },
              conditions: move.conditions,
            });
          }

          sequencesToTest.push(moveList);
          moveList = [];

          // 0 +
          for (i = 1; i <= this.boardSize.rankCount - spot.rank; i++) {
            moveList.push({
              to: { file: spot.file, rank: spot.rank + i },
              conditions: move.conditions,
            });
          }

          sequencesToTest.push(moveList);
          moveList = [];

          // 0 -
          for (i = 1; i <= spot.rank - 1; i++) {
            moveList.push({
              to: { file: spot.file, rank: spot.rank - i },
              conditions: move.conditions,
            });
          }

          sequencesToTest.push(moveList);
          moveList = [];
          break;
        default:
          sequencesToTest.push([
            {
              to: {
                file: spot.file + move.pattern.fileChange,
                rank: spot.rank + move.pattern.rankChange,
              },
              conditions: move.conditions,
            },
          ]);
          break;
      }
    });

    sequencesToTest.forEach((sequence) => {
      sequence.every((move) => {
        // using every instead of forEach so that looping can be broken at any point by not returning a true value
        let testResult = this.testMove(
          spot,
          move.to,
          move.conditions,
          piece,
          preventLooping
        );
        if (testResult.possible) {
          // move is possible
          checkedMoves.push({
            to: move.to,
            specialProps: testResult.specialProps,
          });
          if (!testResult.specialProps.includes("capture")) {
            // move is not a capture, so move on to the next is the sequence
            return true; // because "every" function is being used, a true return will continue looping. no return breaks the loop
          }
        } else if (testResult.failedFor === "puts king in check") {
          return true;
        }
      });
    });

    return checkedMoves;
  }

  testMove(from, to, conditions, piece, preventLooping) {
    let possible = true;
    let failedFor = "";
    let specialProps = [];

    let player = whichPlayer(piece);

    if (
      to.file > this.boardSize.fileCount ||
      to.rank > this.boardSize.rankCount ||
      to.file < 1 ||
      to.rank < 1
    ) {
      possible = false;
      failedFor = "out of bounds";
    } else {
      let destinationPiece = this.getPieceAt(to.file, to.rank);

      if (isFriendly(destinationPiece, player)) {
        possible = false;
        failedFor = "friendly piece";
      } else {
        if (piece.toLowerCase() === "k") {
          // if piece is a king
          specialProps.push("disallow short castle", "disallow long castle");
        } else if (piece.toLowerCase() === "r") {
          // if piece is a rook
          if (from.file === 1) {
            // and rook is on 'a' file
            specialProps.push("disallow long castle");
          } else if (from.file === 8) {
            // and rook is on 'h' file
            specialProps.push("disallow short castle");
          }
        }

        if (destinationPiece !== "") {
          specialProps.push("capture");
        }

        if (conditions.length > 0) {
          conditions.every((condition) => {
            switch (condition.function) {
              case "capture":
                if (!specialProps.includes("capture")) {
                  possible = false;
                  failedFor = "failed condition: 'capture'";
                }
                break;
              case "not capture":
                if (specialProps.includes("capture")) {
                  possible = false;
                  failedFor = "failed condition: 'not capture'";
                }
                break;

              case "on file":
                if (condition.value !== from.file) {
                  possible = false;
                  failedFor = `failed condition: 'on file ${condition.value}`;
                }
                break;
              case "on rank":
                if (condition.value !== from.rank) {
                  possible = false;
                  failedFor = `failed condition: 'on rank ${condition.value}`;
                }
                break;

              case "empty file":
                if (this.getPieceAt(condition.value, from.rank) !== "") {
                  possible = false;
                  failedFor = `failed condition: 'empty file ${condition.value}`;
                }
                break;
              case "empty rank":
                if (this.getPieceAt(from.file, condition.value) !== "") {
                  possible = false;
                  failedFor = `failed condition: 'empty rank ${condition.value}`;
                }
                break;

              case "not attacked":
                if (preventLooping) {
                  break;
                } else {
                  if (
                    this.checkIfAttacked(
                      { file: from.file, rank: from.rank },
                      player
                    )
                  ) {
                    possible = false;
                    failedFor = "failed condition: 'not attacked'";
                  }
                }
                break;

              case "file not attacked":
                if (preventLooping) {
                  break;
                } else {
                  if (
                    this.checkIfAttacked(
                      { file: condition.value, rank: from.rank },
                      player
                    )
                  ) {
                    possible = false;
                    failedFor = `failed condition: 'file not attacked ${condition.value}'`;
                  }
                }
                break;
              case "rank not attacked":
                if (preventLooping) {
                  break;
                } else {
                  if (
                    this.checkIfAttacked(
                      { file: from.file, rank: condition.value },
                      player
                    )
                  ) {
                    possible = false;
                    failedFor = `failed condition: 'rank not attacked ${condition.value}'`;
                  }
                }
                break;

              // the following are linked to a special property

              case "short castle":
                specialProps.push("short castle");
                if (!this.castlingPossibilities[player].short) {
                  possible = false;
                  failedFor = `failed condition: 'short castle'`;
                }
                break;
              case "long castle":
                specialProps.push("long castle");
                if (!this.castlingPossibilities[player].long) {
                  possible = false;
                  failedFor = `failed condition: 'long castle'`;
                }
                break;

              case "en passant":
                specialProps.push("en passant", "capture");
                if (
                  to.file !== this.state.enPassantSquare.file ||
                  to.rank !== this.state.enPassantSquare.rank
                ) {
                  possible = false;
                  failedFor = "failed condition: 'en passant'";
                }
                break;

              case "double advance":
                specialProps.push("double advance");
                break;
              default:
                console.error(
                  `Unknown condition: ${condition.function} ${
                    condition.value ? `with value of ${condition.value}` : ""
                  }`
                );
            }
            if (possible) {
              return true;
            }
          });
        }
      }

      if (
        piece.toLowerCase() === "p" &&
        (to.rank === this.boardSize.rankCount || to.rank === 1)
      ) {
        specialProps.push("promotion");
      }

      if (possible && !preventLooping) {
        if (piece.toLowerCase() === "k") {
          let kingPos = to;

          this.position[from.rank - 1][from.file - 1] = "";

          if (this.checkIfAttacked(kingPos, player)) {
            possible = false;
            failedFor = "puts king in check";
          }

          this.position[from.rank - 1][from.file - 1] = piece;
        } else {
          let kingPos = this.findPiece(player === "white" ? "K" : "k");

          this.position[from.rank - 1][from.file - 1] = "";
          let replaceDestination = this.getPieceAt(to.file, to.rank);
          this.position[to.rank - 1][to.file - 1] = piece;

          if (this.checkIfAttacked(kingPos, player)) {
            possible = false;
            failedFor = "puts king in check";
          }

          this.position[from.rank - 1][from.file - 1] = piece;
          this.position[to.rank - 1][to.file - 1] = replaceDestination;
        }
      }
    }

    return {
      possible: possible,
      failedFor: failedFor,
      specialProps: specialProps,
    };
  }

  commitMove(from, to, specialProps) {
    clearBoardSignals();
    let currentPlayer = this.currentPlayer;

    let movePiece = this.getPieceAt(from.file, from.rank);
    let destinationPiece = this.getPieceAt(to.file, to.rank);
    this.position[from.rank - 1][from.file - 1] = "";
    this.position[to.rank - 1][to.file - 1] = movePiece;

    this.state.currentlyHighlighted = highlight(
      [from, to],
      this.state.currentlyHighlighted
    );

    let moveSpecs = {
      player: currentPlayer,
      shortCastle: false,
      longCastle: false,
      pieceNotation: movePiece.toUpperCase(),
      disambiguity: {
        necessary: { file: false, rank: false },
        file: from.file,
        rank: from.rank,
      },
      capture: false,
      to: to,
      check: false,
      checkmate: false,
      enPassant: false,
      promotion: { is: false, promoteTo: null },
    };

    if (specialProps.length > 0) {
      specialProps.forEach((property) => {
        switch (property) {
          case "capture":
            moveSpecs.capture = true;
            if (specialProps.includes("en passant")) break;
            this.captures[currentPlayer].push(destinationPiece.toLowerCase());
            updateCaptures(
              destinationPiece.toLowerCase(),
              currentPlayer,
              this.settings.pieceStyle
            );
            break;

          case "double advance":
            this.state.enPassantSquare = {
              file: to.file,
              rank: currentPlayer === "white" ? to.rank - 1 : to.rank + 1,
            };
            break;

          case "en passant":
            moveSpecs.enPassant = true;
            this.position[
              currentPlayer === "white"
                ? this.state.enPassantSquare.rank - 2
                : this.state.enPassantSquare.rank
            ][this.state.enPassantSquare.file - 1] = "";
            this.captures[currentPlayer].push(destinationPiece.toLowerCase());
            updateCaptures(
              destinationPiece.toLowerCase(),
              currentPlayer,
              this.settings.pieceStyle
            );
            break;

          case "short castle":
            moveSpecs.shortCastle = true;
            this.position[to.rank - 1][7] = "";
            this.position[to.rank - 1][5] =
              currentPlayer === "white" ? "R" : "r";
            break;
          case "long castle":
            moveSpecs.longCastle = true;
            this.position[to.rank - 1][0] = "";
            this.position[to.rank - 1][3] =
              currentPlayer === "white" ? "R" : "r";
            break;

          case "disallow short castle":
            this.castlingPossibilities[currentPlayer].short = false;
            break;
          case "disallow long castle":
            this.castlingPossibilities[currentPlayer].long = false;
            break;

          case "promotion":
            moveSpecs.promotion.is = true;
            this.state.paused = true;
            this.state.promotionSquare = to;
            openPromotionPrompt();
            break;
        }
      });
    }

    if (!specialProps.includes("double advance")) {
      this.state.enPassantSquare = { file: null, rank: null };
    }

    updateHistory(
      moveSpecs,
      this.settings.moveNotation,
      this.history.length,
      this.settings.scrollHistory
    );
    this.history.push({
      move: moveSpecs,
      position: this.position,
      highlighted: this.state.currentlyHighlighted,
    });
  }

  // #region utility

  findPiece(piece) {
    let res;
    this.position.every((rank, index) => {
      if (rank.includes(piece)) {
        res = { file: rank.indexOf(piece) + 1, rank: index + 1 };
      } else {
        return true;
      }
    });
    return res;
  }

  getPieceAt(file, rank) {
    return this.position[rank - 1][file - 1];
  }

  checkIfAttacked(spot, player) {
    let attacked = false;

    let piecesToIterate = [];
    let attackingPieces = [];

    if (player === "white") {
      piecesToIterate = ["P", "R", "N", "B", "Q", "K"];
      attackingPieces = ["p", "r", "n", "b", "q", "k"];
    } else {
      piecesToIterate = ["p", "r", "n", "b", "q", "k"];
      attackingPieces = ["P", "R", "N", "B", "Q", "K"];
    }

    piecesToIterate.every((iterationPiece, index) => {
      let spotsToCheck = this.getPossibleMoves(
        spot,
        iterationPiece,
        true,
        false
      );

      spotsToCheck = spotsToCheck.filter((varb) =>
        varb.specialProps.includes("capture")
      );

      if (spotsToCheck.length > 0) {
        spotsToCheck.every((varb) => {
          if (
            this.getPieceAt(varb.to.file, varb.to.rank) ===
            attackingPieces[index]
          ) {
            attacked = true;
          } else {
            return true;
          }
        });
      } else {
        return true;
      }
      if (!attacked) {
        return true;
      }
    });

    return attacked;
  }

  clearState() {
    drawDots([], this.state.currentDots);
    this.state.selected = { file: null, rank: null };
    this.state.possibleMoves = [];
    this.state.currentDots = [];
  }

  switchPlayer() {
    if (this.currentPlayer === "white") {
      this.currentPlayer = "black";
    } else {
      this.currentPlayer = "white";
    }

    this.clearState();
  }

  toggleInput(el) {
    let parentSetting = el.dataset.parentsetting;
    let setting = el.dataset.setting;

    if (parentSetting) {
      this.settings[parentSetting][setting] =
        !this.settings[parentSetting][setting];

      el.dataset.toggle = `${this.settings[parentSetting][setting]}`;

      this.settingUpdate(
        parentSetting,
        setting,
        this.settings[parentSetting][setting]
      );
    } else {
      this.settings[setting] = !this.settings[setting];

      el.dataset.toggle = this.settings[setting];

      this.settingUpdate(parentSetting, setting, this.settings[setting]);
    }
  }

  handleTextInput(el) {
    let parentSetting = el.dataset.parentsetting;
    let setting = el.dataset.setting;

    if (parentSetting) {
      this.settings[parentSetting][setting] = el.value;
    } else {
      this.settings[setting] = el.value;
    }

    this.settingUpdate(parentSetting, setting, el.value);
  }

  selectOption(el) {
    let dropdownEl = el.parentElement.parentElement;

    let parentSetting = dropdownEl.dataset.parentsetting;
    let setting = dropdownEl.dataset.setting;

    let value = el.dataset.value;

    if (parentSetting) {
      this.settings[parentSetting][setting] = value;
    } else {
      this.settings[setting] = value;
    }

    dropdownEl.dataset.value = value;

    this.settingUpdate(parentSetting, setting, value);
  }

  settingUpdate(parentSetting, setting, value) {
    let body = $("#body");
    let root = document.documentElement; // !must use default js, not jquery
    let allSelect = $("*");

    if (parentSetting === "moveNotation") {
      $(".history > .table-row:not(:first-child)").remove();
      this.history.forEach((move, index) => {
        if (index > 0) {
          updateHistory(
            move.move,
            this.settings.moveNotation,
            index,
            index === this.history.length - 1
              ? this.settings.scrollHistory
              : "never"
          );
        }
      });
      return;
    }

    switch (setting) {
      case "coordinates":
        body.css("--coordinate-display", value ? 1 : 0);
        break;
      case "largePieces":
        body.css("--piece-size", value ? "90%" : "75%");
        break;
      case "fontSize":
        root.style.setProperty("font-size", value ? "1.2rem" : "1rem");
        break;
      case "animations":
        if (value) {
          allSelect.removeClass("instantAnimate");
        } else {
          allSelect.addClass("instantAnimate");
        }
        break;
      case "pieceStyle":
        display(this.position, value);
        break;
      case "moveNums":
        // --move-num-opacity: 0;
        // --history-hover-control
        if (value === "always") {
          body.css("--move-num-opacity", "1");
        } else if (value === "never") {
          body.css("--move-num-opacity", "0");
          body.css("--history-hover-control", "none");
        } else if (value === "on hover") {
          body.css("--move-num-opacity", "0");
          body.css("--history-hover-control", "all");
        }
        break;
      case "scrollHistory":
        break;
      default:
        console.error(`unknown setting: ${setting} being set to ${value}`);
        break;
    }
  }

  // #endregion // utility

  useTestingHistory() {
    this.history = testingHistory;
    $(".history > .table-row:not(:first-child)").remove();
    this.history.forEach((move, index) => {
      if (index > 0) {
        updateHistory(
          move.move,
          this.settings.moveNotation,
          index,
          index === this.history.length - 1
            ? this.settings.scrollHistory
            : "never"
        );
      }
    });
    this.position = this.history.at(-1).position;
    display(this.position, this.settings.pieceStyle);
  }
}

function isFriendly(piece, team) {
  return (
    piece &&
    ((piece === piece.toUpperCase() && team === "white") ||
      (piece === piece.toLowerCase() && team === "black"))
  );
}

function whichPlayer(piece) {
  if (piece.toUpperCase() === piece) {
    return "white";
  } else {
    return "black";
  }
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";
function numToLetter(num) {
  num = (num - 1) % alphabet.length;
  return alphabet[num];
}
function letterToNum(letter) {
  letter = letter.toLowerCase();
  return alphabet.indexOf(letter) + 1;
}
