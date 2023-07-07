var windowSize;
var rightClickTarget = "";
var loadingCont = true;
var loadingAnimation;
var currLoadAnim = 0;
var arrows = [];
var spotEls = [];
var dropdowns = {};

function initializeBoardHTML(whiteInfo, blackInfo) {
  window.addEventListener("resize", (e) => {
    handlePageResize(e.target);
  });
  windowSize = { height: window.innerHeight, width: window.innerWidth };
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      closeModal("all");
    }
  });

  let parent = $("main")[0];

  // #region board
  let boardEl = document.createElement("div");
  boardEl.id = "board";
  for (i = 0; i < 64; i++) {
    let spotEl = document.createElement("div");
    spotEl.classList.add("spot");
    spotEl.dataset.spotid = i + 1;
    if (Math.floor(i / 8) % 2 === (i % 8) % 2) {
      spotEl.classList.add("light");
    } else {
      spotEl.classList.add("dark");
    }
    spotEl.addEventListener("mousedown", (e) => {
      if (e.which === 3) {
        rightClickTarget = e.target;
      }
    });
    spotEl.addEventListener("click", () => {
      spotClicked(spotEl);
    });
    spotEl.addEventListener("contextmenu", (e) => {
      handleContextMenu(e);
    });
    spotEls.push(spotEl);
    boardEl.appendChild(spotEl);
  }

  parent.appendChild(boardEl);
  // #endregion

  // #region sidebar
  let sideBarEl = document.createElement("aside");
  sideBarEl.id = "sidebar";

  // #region history/gameInfo
  let historyCardEl = document.createElement("div");
  historyCardEl.id = "game-info";

  let containerEl = document.createElement("div");
  containerEl.classList.add("container");

  let headerEl = document.createElement("h2");
  headerEl.innerText = "History";

  containerEl.appendChild(headerEl);

  // #region move history
  let rowEl = document.createElement("div");
  rowEl.classList.add("header-row");
  let whiteSpanEl = document.createElement("h3");
  whiteSpanEl.innerText = "White";
  rowEl.appendChild(whiteSpanEl);
  let blackSpanEl = document.createElement("h3");
  blackSpanEl.innerText = "Black";
  rowEl.appendChild(blackSpanEl);
  containerEl.appendChild(rowEl);

  let movesWrapperEl = document.createElement("div");
  movesWrapperEl.classList.add("history-wrapper");

  // #region TESTING
  // for (i = 0; i < 10; i++) {
  //   let moveRow = document.createElement("div");
  //   moveRow.classList.add("move-set");
  //   moveRow.dataset.rowid = i + 1;
  //   let move1 = document.createElement("span");
  //   move1.innerText = randomMove();
  //   let move2 = document.createElement("span");
  //   move2.innerText = randomMove();
  //   moveRow.append(move1, move2);
  //   movesWrapperEl.appendChild(moveRow);
  // }
  // #endregion

  containerEl.appendChild(movesWrapperEl);
  // #endregion

  historyCardEl.appendChild(containerEl);

  // #region undo button
  let gameControlWrapperEl = document.createElement("div");
  gameControlWrapperEl.classList.add("game-controls");
  let firstControlEl = document.createElement("button");
  firstControlEl.type = "button";
  firstControlEl.addEventListener("click", () => {
    undoMove();
  });
  firstControlEl.innerText = "Undo";
  gameControlWrapperEl.appendChild(firstControlEl);
  // #endregion

  // #region redo button
  let secondControlEl = document.createElement("button");
  secondControlEl.type = "button";
  secondControlEl.addEventListener("click", () => {
    redoMove();
  });
  secondControlEl.innerText = "Redo";
  gameControlWrapperEl.appendChild(secondControlEl);
  // #endregion

  historyCardEl.appendChild(gameControlWrapperEl);

  sideBarEl.appendChild(historyCardEl);
  // #endregion

  // #region player info
  let playerCardEl = document.createElement("div");
  playerCardEl.id = "player-info";

  // #region white info
  let whiteInfoEl = document.createElement("div");
  whiteInfoEl.id = "white-info";
  let whiteInfoHeaderEl = document.createElement("div");
  whiteInfoHeaderEl.classList.add("player-info-header");

  let whiteNameEl = document.createElement("h3");
  whiteNameEl.classList.add("player-name");
  whiteNameEl.innerText = whiteInfo.name;
  whiteNameEl.addEventListener("click", () => {
    playerModal(whiteInfo.id);
  });
  whiteInfoHeaderEl.appendChild(whiteNameEl);

  let whiteEloEl = document.createElement("small");
  whiteEloEl.classList.add("player-elo");
  whiteEloEl.innerText = whiteInfo.elo;
  whiteInfoHeaderEl.appendChild(whiteEloEl);

  whiteInfoEl.appendChild(whiteInfoHeaderEl);

  let whiteCapturesEl = document.createElement("div");
  whiteCapturesEl.classList.add("captures");

  let wPCapturesEl = document.createElement("div");
  wPCapturesEl.classList.add("piece-captures", "p");
  whiteCapturesEl.appendChild(wPCapturesEl);
  let wBCapturesEl = document.createElement("div");
  wBCapturesEl.classList.add("piece-captures", "b");
  whiteCapturesEl.appendChild(wBCapturesEl);
  let wNCapturesEl = document.createElement("div");
  wNCapturesEl.classList.add("piece-captures", "n");
  whiteCapturesEl.appendChild(wNCapturesEl);
  let wRCapturesEl = document.createElement("div");
  wRCapturesEl.classList.add("piece-captures", "r");
  whiteCapturesEl.appendChild(wRCapturesEl);
  let wQCapturesEl = document.createElement("div");
  wQCapturesEl.classList.add("piece-captures", "q");
  whiteCapturesEl.appendChild(wQCapturesEl);

  whiteInfoEl.appendChild(whiteCapturesEl);

  playerCardEl.appendChild(whiteInfoEl);
  // #endregion

  // #region black info
  let blackInfoEl = document.createElement("div");
  blackInfoEl.id = "black-info";
  let blackInfoHeaderEl = document.createElement("div");
  blackInfoHeaderEl.classList.add("player-info-header");

  let blackNameEl = document.createElement("h3");
  blackNameEl.classList.add("player-name");
  blackNameEl.innerText = blackInfo.name;
  blackNameEl.addEventListener("click", () => {
    playerModal(blackInfo.id);
  });
  blackInfoHeaderEl.appendChild(blackNameEl);

  let blackEloEl = document.createElement("small");
  blackEloEl.classList.add("player-elo");
  blackEloEl.innerText = blackInfo.elo;
  blackInfoHeaderEl.append(blackEloEl);

  blackInfoEl.appendChild(blackInfoHeaderEl);

  let blackCapturesEl = document.createElement("div");
  blackCapturesEl.classList.add("captures");

  let bPCapturesEl = document.createElement("div");
  bPCapturesEl.classList.add("piece-captures", "p");
  blackCapturesEl.appendChild(bPCapturesEl);
  let bBCapturesEl = document.createElement("div");
  bBCapturesEl.classList.add("piece-captures", "b");
  blackCapturesEl.appendChild(bBCapturesEl);
  let bNCapturesEl = document.createElement("div");
  bNCapturesEl.classList.add("piece-captures", "n");
  blackCapturesEl.appendChild(bNCapturesEl);
  let bRCapturesEl = document.createElement("div");
  bRCapturesEl.classList.add("piece-captures", "r");
  blackCapturesEl.appendChild(bRCapturesEl);
  let bQCapturesEl = document.createElement("div");
  bQCapturesEl.classList.add("piece-captures", "q");
  blackCapturesEl.appendChild(bQCapturesEl);

  blackInfoEl.appendChild(blackCapturesEl);

  playerCardEl.appendChild(blackInfoEl);
  // #endregion

  // playerCardEl.appendChild(blackInfoEl);

  sideBarEl.appendChild(playerCardEl);
  // #endregion

  parent.appendChild(sideBarEl);

  // #endregion

  currLoadAnim = Math.floor(Math.random() * loadingArr.length);
  // currLoadAnim = loadingArr.length - 1;
  loading();

  let dropdownEls = document.querySelectorAll(".dropdown");
  dropdownEls.forEach((el) => {
    el.addEventListener("click", (event) => {
      let dropdown = event.target;
      let optionList = document.querySelector(
        `.option-list[data-setting='${dropdown.dataset.setting}']`
      );
      if (dropdown.dataset.open === "false") {
        dropdown.dataset.open = "true";
        let optionEls = optionList.querySelectorAll(".custom-option");
        let selectedEl;
        let cont = true;
        optionEls.forEach((el) => {
          if (cont) {
            if (el.innerText === dropdown.innerText) {
              selectedEl = el;
              cont = false;
            }
          }
        });
        if (selectedEl) {
          selectedEl.scrollIntoView({ block: "center" });
          let selectedMiddle =
            selectedEl.getBoundingClientRect().top +
            selectedEl.getBoundingClientRect().height / 2;
          let dropdownMiddle =
            dropdown.getBoundingClientRect().top +
            dropdown.getBoundingClientRect().height / 2;
          if (Math.abs(selectedMiddle - dropdownMiddle) > 1) {
            let top = parseInt(getComputedStyle(optionList).top);
            let addToTop = (selectedMiddle - dropdownMiddle) * -1;
            optionList.style.top = top + addToTop + "px";
          }
        }
      } else dropdown.dataset.open = "false";
    });
    dropdowns[el.dataset.setting] = el;
  });

  return {
    board: boardEl,
    spots: spotEls,
    history: movesWrapperEl,
    whiteCaptures: {
      p: wPCapturesEl,
      b: wBCapturesEl,
      n: wNCapturesEl,
      r: wRCapturesEl,
      q: wQCapturesEl,
    },
    blackCaptures: {
      p: bPCapturesEl,
      b: bBCapturesEl,
      n: bNCapturesEl,
      r: bRCapturesEl,
      q: bQCapturesEl,
    },
  };
}

function openModal(which) {
  $(`#${which}-modal`).css("display", "block");
  $(".modal").attr("data-open", "false");
  setTimeout(() => {
    $(`#${which}-modal`).attr("data-open", "true");
  }, 1);
}
function closeModal(which) {
  if (which === "all") {
    $(".modal").attr("data-open", "false");
    setTimeout(() => {
      $(`.modal`).css("display", "none");
    }, 200);
  } else {
    $(`#${which}-modal`).attr("data-open", "false");
    setTimeout(() => {
      $(`#${which}-modal`).css("display", "none");
    }, 200);
  }
}

function playerModal(player) {
  console.log(player);
}

function spotClicked(el) {
  if (loadingCont) {
    stopLoading();
  }
  removeHighlights();
  removeArrows();
  console.log(el);
}
function handleContextMenu(e) {
  e.preventDefault();

  if (rightClickTarget === e.target) {
    if (e.shiftKey) {
      switchHighlight(e.target, "shift");
    } else switchHighlight(e.target, "normal");
    rightClickTarget = "";
  } else {
    if (rightClickTarget === "") return;
    let cont = true;
    arrows.every((currentArrow, index) => {
      if (
        currentArrow.from === rightClickTarget.dataset.spotid &&
        currentArrow.to === e.target.dataset.spotid
      ) {
        arrows[index].el.forEach((el) => {
          el.remove();
        });
        arrows.splice(index, 1);
        cont = false;
      } else return true;
    });
    if (cont) {
      createArrow(rightClickTarget, e.target);
    }
  }
}

async function handlePageResize(windowRef) {
  let currWindowSize = {
    height: windowRef.innerHeight,
    width: windowRef.innerWidth,
  };
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (
    currWindowSize.height === window.innerHeight &&
    currWindowSize.width === window.innerWidth &&
    !(
      windowSize.height === window.innerHeight &&
      windowSize.width === window.innerWidth
    )
  ) {
    // arrows
    let tempArrows = removeArrows();
    tempArrows.forEach((arrow) => {
      createArrow(
        $(`.spot[data-spotid=${arrow.from}]`)[0],
        $(`.spot[data-spotid=${arrow.to}]`)[0]
      );
    });
    windowSize = currWindowSize;
  }
}

function createArrowEl(fromEl, toEl) {
  let fromRect = fromEl.getBoundingClientRect();
  let from = {
    x: fromRect.left + fromRect.width / 2,
    y: fromRect.top + fromRect.height / 2,
  };
  let toRect = toEl.getBoundingClientRect();
  let to = {
    x: toRect.left + toRect.width / 2,
    y: toRect.top + toRect.height / 2,
  };

  var arrowBody = document.createElement("div");
  arrowBody.classList.add("arrow-body");
  arrowBody.classList.add("opacity");
  var arrowSegment;
  var knightsMove = false;

  let yDiff = Math.abs(from.y - to.y);
  let xDiff = Math.abs(from.x - to.x);
  let height = fromRect.height;
  let width = fromRect.width;

  if (
    (Math.abs(yDiff - height * 2) < height / 2 &&
      Math.abs(xDiff - width) < width / 2) ||
    (Math.abs(yDiff - height) < height / 2 &&
      Math.abs(xDiff - width * 2) < width / 2)
  ) {
    knightsMove = true;
    // #region knight's moves
    arrowSegment = document.createElement("div");
    arrowSegment.classList.add("arrow-segment");
    arrowSegment.classList.add("opacity");
    if (Math.abs(from.x - to.x) > Math.abs(from.y - to.y)) {
      // #region arrowStuff
      arrowBody.classList.add("knights-horizontal");
      arrowSegment.style.top = from.y + "px";
      arrowBody.style.left = to.x + "px";
      arrowBody.style.top = from.y + "px";
      if (from.x < to.x) {
        arrowSegment.style.left = from.x + "px";
      } else {
        arrowSegment.style.left = to.x + 6 + "px";
        arrowSegment.classList.add("flipped");
      }
      if (from.y < to.y) {
        arrowBody.style.rotate = "90deg";
      } else {
        arrowBody.style.rotate = "-90deg";
      }
      arrowSegment.style.width = Math.abs(from.x - to.x) - 6 + "px";
      arrowBody.style.width = Math.abs(from.y - to.y) - 12 + "px";
      // #endregion
    } else {
      // #region arrowStuff
      arrowBody.classList.add("knights-vertical");
      arrowSegment.style.left = from.x + "px";
      arrowBody.style.top = to.y + "px";
      if (from.y < to.y) {
        arrowSegment.style.top = from.y + "px";
        arrowSegment.style.rotate = "90deg";
      } else {
        arrowSegment.style.top = from.y - 1 + "px";
        arrowSegment.style.rotate = "-90deg";
      }
      if (from.x < to.x) {
        arrowBody.style.left = from.x + "px";
      } else {
        arrowBody.style.left = to.x + "px";
        arrowBody.classList.add("flipped");
      }
      arrowSegment.style.width = Math.abs(from.y - to.y) - 6 + "px";
      arrowBody.style.width = Math.abs(from.x - to.x) - 12 + "px";
      // #endregion
    }
    $("body")[0].append(arrowSegment, arrowBody);
    setTimeout(
      () => {
        arrowSegment.classList.remove("opacity");
        arrowBody.classList.remove("opacity");
      },
      1,
      arrowSegment
    );
    // #endregion
  } else {
    let width = Math.sqrt((from.x - to.x) ** 2 + (from.y - to.y) ** 2);
    let angleRad = Math.atan((from.y - to.y) / (from.x - to.x));
    let rotation = (angleRad * 180) / Math.PI;
    // #region arrow body
    if (from.x < to.x) {
      arrowBody.style.top = from.y + "px";
      arrowBody.style.left = from.x + "px";
    } else {
      arrowBody.style.top = to.y + "px";
      arrowBody.style.left = to.x + "px";
      arrowBody.classList.add("flipped");
    }
    arrowBody.style.width = width - 16 + "px";
    if (rotation === Infinity) {
      arrowBody.style.rotate = 90 + "deg";
    } else if (rotation === -Infinity) {
      arrowBody.style.rotate = -90 + "deg";
    } else {
      arrowBody.style.rotate = rotation + "deg";
    }
    $("body")[0].appendChild(arrowBody);
    setTimeout(
      () => {
        arrowBody.classList.remove("opacity");
      },
      1,
      arrowBody
    );
    // #endregion
  }
  if (knightsMove) {
    return [arrowBody, arrowSegment];
  } else {
    return [arrowBody];
  }
}
function removeArrows() {
  let prevArrowsArray = arrows;
  arrows.forEach((arrow) => {
    arrow.el.forEach((el) => {
      el.remove();
    });
  });
  arrows = [];
  return prevArrowsArray;
}
function switchHighlight(el, specialCase) {
  switch (specialCase) {
    case "normal":
      el.classList.toggle("highlight");
      if (el.classList.contains("dark-highlight"))
        el.classList.remove("dark-highlight");
      break;
    case "shift":
      el.classList.toggle("dark-highlight");
      if (el.classList.contains("highlight")) el.classList.remove("highlight");
      break;
  }
}
function removeHighlights(only = "") {
  let highlights;
  switch (only) {
    case "normal":
      highlights = document.querySelectorAll(".spot.highlight");
      if (highlights.length > 0) {
        highlights.forEach((tempEl) => {
          tempEl.classList.remove("highlight");
        });
      }
      break;
    case "dark":
      highlights = document.querySelectorAll(".spot.dark-highlight");
      if (highlights.length > 0) {
        highlights.forEach((tempEl) => {
          tempEl.classList.remove("dark-highlight");
        });
      }
      break;
    default:
      highlights = [
        ...document.querySelectorAll(".spot.highlight"),
        ...document.querySelectorAll(".spot.dark-highlight"),
      ];
      if (highlights.length > 0) {
        highlights.forEach((tempEl) => {
          tempEl.classList.remove("highlight", "dark-highlight");
        });
      }
  }
}

function setValue(setting, value) {
  if (dropdowns[setting]) {
    dropdowns[setting].innerText = value;
    closeDropdown(setting);
    return true;
  } else return false;
}
function closeDropdown(setting) {
  if (dropdowns[setting]) {
    dropdowns[setting].dataset.open = "false";
    return true;
  } else {
    return false;
  }
}

// #region TESTING
function randomMove() {
  var alphabet = "abcdefgh";
  var pieces = "nbrqkNBRQK";
  var res = "";
  if (Math.random() < 0.8) {
    res = pieces[Math.round(Math.random() * 9)];
  }
  if (Math.random() < 0.1) {
    if (Math.random() < 0.3) {
      res +=
        alphabet[Math.round(Math.random() * 7)] +
        (Math.round(Math.random() * 7) + 1) +
        alphabet[Math.round(Math.random() * 7)] +
        (Math.round(Math.random() * 7) + 1);
    } else {
      if (Math.random() < 0.5) {
        res +=
          alphabet[Math.round(Math.random() * 7)] +
          alphabet[Math.round(Math.random() * 7)] +
          (Math.round(Math.random() * 7) + 1);
      } else {
        res +=
          Math.round(Math.random() * 7) +
          1 +
          alphabet[Math.round(Math.random() * 7)] +
          (Math.round(Math.random() * 7) + 1);
      }
    }
  } else {
    res +=
      alphabet[Math.round(Math.random() * 7)] +
      (Math.round(Math.random() * 7) + 1);
  }
  return res;
}
function makeArrows(
  fromMin = 1,
  fromMax = 64,
  toMin = 1,
  toMax = 64,
  only = "both",
  clearAfter = true,
  timeControl = 5
) {
  if (fromMin < 1) fromMin = 1;
  if (fromMin > 64) fromMin = 64;
  if (fromMax < 1) fromMax = 1;
  if (fromMax > 64) fromMax = 64;
  if (fromMin > fromMax) fromMin = fromMax;
  if (toMin < 1) toMin = 1;
  if (toMin > 64) toMin = 64;
  if (toMax < 1) toMax = 1;
  if (toMax > 64) toMax = 64;
  if (toMin > toMax) toMin = toMax;
  var timeBegan = new Date();
  var counter = 0;
  for (i = fromMin; i <= fromMax; i++) {
    for (j = toMin; j <= toMax; j++) {
      let cont = true;
      let isLast = false;
      if ((only === "forwards" && i >= j) || (only === "backwards" && i <= j))
        cont = false;
      if (((only === "backwards" && i - 1 === j) || j === toMax) && clearAfter)
        isLast = true;
      if (i !== j && cont) {
        let el1 = $(`.spot[data-spotid=${i}]`)[0];
        let el2 = $(`.spot[data-spotid=${j}]`)[0];
        setTimeout(
          () => {
            createArrow(el1, el2);

            if (isLast) {
              removeArrows();
            }
          },
          counter * timeControl,
          el1,
          el2,
          isLast
        );
        counter++;
      }
    }
  }
  setTimeout(() => {
    let timeNow = new Date();
    let timeShouldTake = (counter * timeControl) / 1000;
    let timeDidTake = (timeNow - timeBegan - 20) / 1000;
    let diff = Math.round((timeDidTake - timeShouldTake) * 1000) / 1000;
    console.log(
      "operation took " +
        timeDidTake +
        " second(s); took " +
        diff +
        " second(s) longer than expected."
    );
    if (clearAfter) removeArrows();
  }, counter * timeControl + 20);
  return (
    "operation should take " + (counter * timeControl) / 1000 + " second(s)."
  );
}
function createArrow(el1, el2) {
  let arrowBody = createArrowEl(el1, el2);

  arrows.push({
    from: el1.dataset.spotid,
    to: el2.dataset.spotid,
    el: arrowBody,
  });
}
const loadingArr = [
  [
    // bottom left to top right
    { delay: 160, remove: [], add: [49, 57, 58] },
    { remove: [], add: [41, 50, 59] },
    { remove: [], add: [33, 42, 51, 60] },
    { remove: [57], add: [25, 34, 43, 52, 61] },
    { remove: [49, 58], add: [17, 26, 35, 44, 53, 62] },
    { remove: [41, 50, 59], add: [9, 18, 27, 36, 45, 54, 63] },
    { remove: [33, 42, 51, 60], add: [1, 10, 19, 28, 37, 46, 55, 64] },
    { remove: [25, 34, 43, 52, 61], add: [2, 11, 20, 29, 38, 47, 56] },
    { remove: [17, 26, 35, 44, 53, 62], add: [3, 12, 21, 30, 39, 48] },
    { remove: [9, 18, 27, 36, 45, 54, 63], add: [4, 13, 22, 31, 40] },
    { remove: [1, 10, 19, 28, 37, 46, 55, 64], add: [5, 14, 23, 32] },
    { remove: [2, 11, 20, 29, 38, 47, 56], add: [6, 15, 24] },
    { remove: [3, 12, 21, 30, 39, 48], add: [7, 16] },
    { remove: [4, 13, 22, 31, 40], add: [8] },
    { remove: [5, 14, 23, 32], add: [] },
    { remove: [6, 15, 24], add: [] },
    { remove: [7, 16], add: [] },
    { remove: [8], add: [] },
  ],
  [
    // clear from middle
    {
      delay: 390,
      remove: [],
      add: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
        57, 58, 59, 60, 61, 62, 63, 64,
      ],
    },
    { remove: [28, 29, 36, 37], add: [] },
    { remove: [19, 20, 21, 22, 27, 30, 35, 38, 43, 44, 45, 46], add: [] },
    {
      remove: [
        10, 11, 12, 13, 14, 15, 18, 23, 26, 31, 34, 39, 42, 47, 50, 51, 52, 53,
        54, 55,
      ],
      add: [],
    },
    {
      remove: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56,
        57, 58, 59, 60, 61, 62, 63, 64,
      ],
      add: [],
    },
  ],
  [
    // slide down
    { delay: 268, remove: [], add: [1, 2, 3, 4, 5, 6, 7, 8] },
    { remove: [], add: [9, 10, 11, 12, 13, 14, 15, 16] },
    { remove: [], add: [17, 18, 19, 20, 21, 22, 23, 24] },
    { remove: [], add: [25, 26, 27, 28, 29, 30, 31, 32] },
    { remove: [], add: [33, 34, 35, 36, 37, 38, 39, 40] },
    { remove: [], add: [41, 42, 43, 44, 45, 46, 47, 48] },
    { remove: [], add: [49, 50, 51, 52, 53, 54, 55, 56] },
    { remove: [], add: [57, 58, 59, 60, 61, 62, 63, 64] },
  ],
  [
    // spiral
    { delay: 149, remove: [], add: [1, 9] },
    { remove: [], add: [2, 10] },
    { remove: [], add: [3, 11] },
    { remove: [], add: [4, 12] },
    { remove: [], add: [5, 13] },
    { remove: [], add: [6, 7, 14] },
    { remove: [], add: [8, 15] },
    { remove: [], add: [16, 23, 24] },
    { remove: [], add: [31, 32] },
    { remove: [], add: [39, 40] },
    { remove: [], add: [47, 48, 56] },
    { remove: [], add: [55, 64] },
    { remove: [], add: [54, 62, 63] },
    { remove: [], add: [53, 61] },
    { remove: [], add: [52, 60] },
    { remove: [], add: [51, 58, 59] },
    { remove: [], add: [50, 57] },
    { remove: [], add: [41, 42, 49] },
    { remove: [], add: [25, 33, 34] },
    { remove: [], add: [17, 26] },
    { remove: [], add: [18, 19, 27] },
    { remove: [], add: [20, 21, 28] },
    { remove: [], add: [22, 29] },
    { remove: [], add: [30, 38] },
    { remove: [], add: [37, 46] },
    { remove: [], add: [44, 45] },
    { remove: [], add: [35, 36, 43] },
  ],
  [
    // fireworks
    { delay: 146, remove: [], add: [61, 53] },
    { remove: [], add: [] },
    { remove: [], add: [52] },
    { remove: [], add: [44] },
    { remove: [61], add: [] },
    { remove: [], add: [36] },
    { remove: [], add: [] },
    { remove: [53, 52], add: [29] },
    { remove: [44, 36], add: [22, 21, 28, 37] },
    { remove: [36, 29], add: [20, 35, 15, 13, 39] },
    { remove: [21, 20, 28], add: [12, 24, 31] },
    { remove: [22], add: [19, 26, 43, 47] },
    { remove: [22, 37, 15], add: [18, 33, 50, 54] },
    { remove: [24, 18, 31, 33], add: [] },
    { remove: [13, 19, 26, 47, 39], add: [20] },
    { remove: [12, 20, 35, 43, 54], add: [] },
    { remove: [50], add: [37, 59] },
    { remove: [37, 59], add: [] },
  ],
];
var loadingProgress = 0;
function loading() {
  loadingCont = true;
  loadingAnimation = setInterval(() => {
    if (loadingProgress >= loadingArr[currLoadAnim].length) {
      clearInterval(loadingAnimation);
      setTimeout(() => {
        removeHighlights("normal");
        let lastAnim = currLoadAnim;
        let rand = Math.floor(Math.random() * (loadingArr.length - 1));
        if (rand >= lastAnim) rand++;
        currLoadAnim = rand;
        loadingProgress = 0;
        loading();
      }, 500);
    } else {
      let obj = loadingArr[currLoadAnim][loadingProgress];
      if (obj.remove.length > 0)
        obj.remove.forEach((index) => {
          spotEls[index - 1].classList.remove("highlight");
        });
      if (obj.add.length > 0)
        obj.add.forEach((index) => {
          spotEls[index - 1].classList.add("highlight");
        });
      loadingProgress++;
    }
  }, loadingArr[currLoadAnim][0].delay);
}
function stopLoading() {
  clearInterval(loadingAnimation);
  // $(".spot").css("transition-duration", "200ms");
  removeHighlights("normal");
  loadingCont = false;
}
// #endregion
