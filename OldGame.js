class Game {
  constructor(startingPosition) {
    this.position = startingPosition; //
    this.currentlyHighlighted = []; //
    this.currentDots = []; //
    this.history = [{ position: startingPosition, highlighted: [] }]; //
    this.selected = { rank: null, file: null }; //
    this.possibleMoves = {}; //
    this.currentPlayer = "white"; //
    this.castling = {
      white: { short: true, long: true },
      black: { short: true, long: true },
    };

    this.enPassantSquare = { rank: null, file: null }; //
  }

  handlePageLoad() {
    display(this.position);
  }

  spotClicked(el) {
    let piece =
      this.position[el.dataset.rank - 1][letterToNum(el.dataset.file) - 1];
    let clickedPieceIsFriendly = isFriendly(piece, this.currentPlayer);
    if (clickedPieceIsFriendly) {
      // if selected spot contains a friendly piece, select the spot
      this.selectSpot({ rank: el.dataset.rank, file: el.dataset.file });
    } else {
      // if piece can move there, move
    }
  }

  selectSpot(spot) {
    let moves = this.getPossibleMoves(spot);

    this.possibleMoves[`${spot.file}${spot.rank}`] = moves;

    let dots = moves.map((movePossibility) => {
      return movePossibility.to;
    });

    this.currentDots = dot(dots, this.currentDots);

    this.currentlyHighlighted = highlight(
      [{ rank: spot.rank, file: spot.file }],
      this.currentlyHighlighted
    );
  }

  getPossibleMoves(spot, allowAttackChecking, piece) {
    let storedValue = this.possibleMoves[`${spot.file}${spot.rank}`];
    if (storedValue) {
      return storedValue;
    }

    if (allowAttackChecking === undefined) {
      allowAttackChecking = true;
    }

    let spotRank = spot.rank;
    let spotFile = spot.file;

    if (!piece) {
      piece = this.getPieceAt(spotRank, spotFile);
    }

    if (piece !== "P") piece = piece.toLowerCase();
    let movesToTry = piecesMoves[piece];

    let checkedMoves = [];

    movesToTry.forEach((move) => {
      switch (move.pattern) {
        case "diagonal":
          for (
            i = parseInt(spotRank) + 1, j = letterToNum(spotFile) + 1;
            i <= 8;
            i++, j++
          ) {
            if (!(j <= 8)) break;
            let destinationRank = i;
            let destinationFile = numToLetter(j);

            let testResult = this.testSequentialMove(
              spotFile,
              piece,
              { rank: destinationRank, file: destinationFile },
              this.currentPlayer
            );

            if (testResult.push !== false) {
              checkedMoves.push(testResult.push);
            }
            if (testResult.break) {
              break;
            }
          }
          for (
            i = parseInt(spotRank) + 1, j = letterToNum(spotFile) - 1;
            i <= 8;
            i++, j--
          ) {
            if (!(j >= 1)) break;

            let destinationRank = i;
            let destinationFile = numToLetter(j);

            let testResult = this.testSequentialMove(
              spotFile,
              piece,
              { rank: destinationRank, file: destinationFile },
              this.currentPlayer
            );

            if (testResult.push !== false) {
              checkedMoves.push(testResult.push);
            }
            if (testResult.break) {
              break;
            }
          }
          for (
            i = parseInt(spotRank) - 1, j = letterToNum(spotFile) + 1;
            i >= 1;
            i--, j++
          ) {
            if (!(j <= 8)) break;

            let destinationRank = i;
            let destinationFile = numToLetter(j);

            let testResult = this.testSequentialMove(
              spotFile,
              piece,
              { rank: destinationRank, file: destinationFile },
              this.currentPlayer
            );

            if (testResult.push !== false) {
              checkedMoves.push(testResult.push);
            }
            if (testResult.break) {
              break;
            }
          }
          for (
            i = parseInt(spotRank) - 1, j = letterToNum(spotFile) - 1;
            i >= 1;
            i--, j--
          ) {
            if (!(j >= 1)) break;

            let destinationRank = i;
            let destinationFile = numToLetter(j);

            let testResult = this.testSequentialMove(
              spotFile,
              piece,
              { rank: destinationRank, file: destinationFile },
              this.currentPlayer
            );

            if (testResult.push !== false) {
              checkedMoves.push(testResult.push);
            }
            if (testResult.break) {
              break;
            }
          }
          break;
        case "straight line":
          for (i = parseInt(spotRank) + 1; i <= 8; i++) {
            let destinationRank = i;

            let destinationFile = spotFile;

            let testResult = this.testSequentialMove(
              spotFile,
              piece,
              { rank: destinationRank, file: destinationFile },
              this.currentPlayer
            );

            if (testResult.push !== false) {
              checkedMoves.push(testResult.push);
            }
            if (testResult.break) {
              break;
            }
          }
          for (i = parseInt(spotRank) - 1; i >= 1; i--) {
            let destinationRank = i;
            let destinationFile = spotFile;

            let testResult = this.testSequentialMove(
              spotFile,
              piece,
              { rank: destinationRank, file: destinationFile },
              this.currentPlayer
            );

            if (testResult.push !== false) {
              checkedMoves.push(testResult.push);
            }
            if (testResult.break) {
              break;
            }
          }
          for (i = letterToNum(spotFile) + 1; i <= 8; i++) {
            let destinationRank = spotRank;
            let destinationFile = numToLetter(i);

            let testResult = this.testSequentialMove(
              spotFile,
              piece,
              { rank: destinationRank, file: destinationFile },
              this.currentPlayer
            );

            if (testResult.push !== false) {
              checkedMoves.push(testResult.push);
            }
            if (testResult.break) {
              break;
            }
          }
          for (i = letterToNum(spotFile) - 1; i >= 1; i--) {
            let destinationRank = spotRank;
            let destinationFile = numToLetter(i);

            let testResult = this.testSequentialMove(
              spotFile,
              piece,
              { rank: destinationRank, file: destinationFile },
              this.currentPlayer
            );

            if (testResult.push !== false) {
              checkedMoves.push(testResult.push);
            }
            if (testResult.break) {
              break;
            }
          }
          break;
        default:
          let testResult = this.testMove(
            spot,
            move,
            piece,
            allowAttackChecking
          );
          if (testResult.possible) {
            checkedMoves.push({
              to: testResult.destination,
              specialProps: testResult.specialProps,
            });
          }
          break;
      }
    });

    return checkedMoves;
  }

  testMove(startingPos, move, piece, allowAttackChecking) {
    let rankChange = parseInt(move.pattern.rankChange);
    let fileChange = parseInt(move.pattern.fileChange);
    let conditions = move.conditions;

    let possible = true;

    let startRank = parseInt(startingPos.rank);
    let startFile = letterToNum(startingPos.file);

    if (!piece) {
      piece = this.getPieceAt(startRank, startFile);
    }

    let destinationRank = startRank + rankChange;
    let destinationFile = startFile + fileChange;

    // Special Properties
    let specialProps = [];

    if (piece === "k") {
      specialProps.push("disallow short castle");
      specialProps.push("disallow long castle");
    } else if (piece === "r") {
      if (startFile === 1) {
        specialProps.push("disallow long castle");
      } else if (startFile === 8) {
        specialProps.push("disallow short castle");
      }
    }

    //   capture
    //      kings only
    //   shortCastle
    //   longCastle
    //      pawns only
    //   doubleAdvance
    //   enPassant
    //   pawnPromotion

    // testing if destination space would be in the bounds of the board and if the piece currently residing on destination space is NOT a friendly piece
    if (
      destinationRank <= 8 &&
      destinationRank >= 1 &&
      destinationFile <= 8 &&
      destinationFile >= 1 &&
      !isFriendly(
        this.getPieceAt(destinationRank, destinationFile),
        this.currentPlayer
      )
    ) {
      if (this.getPieceAt(destinationRank, destinationFile) !== "") {
        specialProps.push("capture");
      }
      if (conditions.length > 0) {
        conditions.forEach((condition) => {
          if (possible) {
            switch (condition.function) {
              case "not capture":
                if (specialProps.indexOf("capture") !== -1) {
                  possible = false;
                }
                break;
              case "capture":
                if (specialProps.indexOf("capture") === -1) {
                  possible = false;
                }
                break;
              case "on rank":
                if (parseInt(condition.value) !== parseInt(startRank)) {
                  possible = false;
                }
                break;
              case "on file":
                if (parseInt(condition.value) !== parseInt(startFile)) {
                  possible = false;
                }
                break;
              case "empty rank":
                if (this.getPieceAt(condition.value, startFile) !== "") {
                  possible = false;
                }
                break;
              case "empty file":
                if (this.getPieceAt(startRank, condition.value) !== "") {
                  possible = false;
                }
                break;
              case "en passant":
                specialProps.push("en passant", "capture");
                if (
                  !(
                    destinationRank === this.enPassantSquare.rank &&
                    destinationFile === this.enPassantSquare.file
                  )
                ) {
                  possible = false;
                }
                break;
              case "double advance":
                specialProps.push("double advance");
                break;
              case "not attacked":
                if (!allowAttackChecking) break;
                if (
                  this.checkIfAttacked(
                    { rank: startRank, file: startFile },
                    this.currentPlayer
                  )
                ) {
                  possible = false;
                }
                break;
              case "file not attacked":
                if (!allowAttackChecking) break;
                if (
                  this.checkIfAttacked(
                    { rank: startRank, file: letterToNum(condition.value) },
                    this.currentPlayer
                  )
                ) {
                  possible = false;
                }
                break;
            }
          }
        });
      }

      if (
        piece.toLowerCase() === "p" &&
        (parseInt(destinationRank) === 8 || parseInt(destinationRank) === 1)
      ) {
        specialProps.push("promotion");
      }
    } else {
      possible = false;
    }

    return {
      possible: possible,
      destination: {
        rank: destinationRank,
        file: numToLetter(destinationFile),
      },
      specialProps: specialProps,
    };
  }

  testSequentialMove(startFile, piece, destination, player) {
    let destinationFile = destination.file;
    let destinationRank = destination.rank;

    let push = false;
    let breakFunction = false;

    let pieceAtDestination = this.getPieceAt(destinationRank, destinationFile);

    let specialProps = [];

    startFile = letterToNum(startFile);

    if (piece === "k") {
      specialProps.push("disallow short castle");
      specialProps.push("disallow long castle");
    } else if (piece === "r") {
      if (startFile === 1) {
        specialProps.push("disallow long castle");
      } else if (startFile === 8) {
        specialProps.push("disallow short castle");
      }
    }

    if (pieceAtDestination === "") {
      push = {
        to: { rank: destinationRank, file: destinationFile },
        specialProps: specialProps,
      };
    } else if (isFriendly(pieceAtDestination, player)) {
      breakFunction = true;
    } else {
      push = {
        to: { rank: destinationRank, file: destinationFile },
        specialProps: [...specialProps, "capture"],
      };
      breakFunction = true;
    }

    return {
      push: push,
      break: breakFunction,
    };
  }

  getPieceAt(rank, file) {
    if (alphabet.includes(file)) {
      file = letterToNum(file);
    }

    rank = parseInt(rank);
    file = parseInt(file);

    return this.position[rank - 1][file - 1];
  }

  checkIfAttacked(spot, player) {
    let piecesToIterate = [];
    let attackingPieces = [];

    let yetAttacked = false;

    if (player === "white") {
      piecesToIterate = ["P", "R", "N", "B", "K"];
      attackingPieces = ["p", "r", "n", "b", "k"];
    } else {
      piecesToIterate = ["p", "r", "n", "b", "k"];
      attackingPieces = ["P", "R", "N", "B", "K"];
    }

    piecesToIterate.forEach((piece, index) => {
      if (!yetAttacked) {
        let spotsToCheck = this.getPossibleMoves(spot, false, piece);

        spotsToCheck.forEach((spot) => {
          if (
            this.getPieceAt(spot.to.rank, spot.to.file) ===
            attackingPieces[index]
          ) {
            yetAttacked = true;
          }
        });
      }
    });

    return yetAttacked;
  }
}

function isFriendly(piece, team) {
  if (
    piece &&
    ((piece === piece.toUpperCase() && team === "white") ||
      (piece === piece.toLowerCase() && team === "black"))
  ) {
    return true;
  } else {
    return false;
  }
}

function highlight(spots, currentlyHighlighted) {
  if (currentlyHighlighted) {
    currentlyHighlighted.forEach((spot) => {
      $(
        `.spot[data-rank="${spot.rank}"][data-file="${spot.file}"]`
      ).removeClass("highlighted");
    });
    currentlyHighlighted = [];
  }

  spots.forEach((spot) => {
    currentlyHighlighted.push({
      rank: spot.rank,
      file: spot.file,
    });
    $(`.spot[data-rank="${spot.rank}"][data-file="${spot.file}"]`).addClass(
      "highlighted"
    );
  });

  return currentlyHighlighted;
}

function dot(spots, currentDots) {
  if (currentDots) {
    currentDots.forEach((spot) => {
      $(
        `.spot[data-rank="${spot.rank}"][data-file="${spot.file}"]`
      ).removeClass("dot");
    });
    currentDots = [];
  }

  spots.forEach((spot) => {
    currentDots.push({
      rank: spot.rank,
      file: spot.file,
    });
    $(`.spot[data-rank="${spot.rank}"][data-file="${spot.file}"]`).addClass(
      "dot"
    );
  });

  return currentDots;
}
