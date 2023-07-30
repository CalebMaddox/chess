var windowSize;
var rightClickTarget = "";
var leftClickTarget = "";
var loadingCont = true;
var loadingAnimation;
var currLoadAnim = 0;
var arrows = [];
var spotEls = [];
var dropdowns = {};
var settingInputs = {};
var selected;
var displayedMoveEl;
var userID;
var userIsWhite;
var board;
const defaultSettings = {
  animations: true,
  flipboard: true,
  coordinates: false,
  coordspos: "Left & Base",
  largepieces: false,
  piecestyle: "Neo",
  possiblemoves: true,
  movenums: "Always",
  historyscroll: "Near Bottom",
  usesymbols: false,
  disambiguity: false,
  promotion: "/PIECE",
  castling: "0",
  enpassant: "e.p.",
  check: "+",
  checkmate: "#",
};

var userSettings = {};

$(document).ready(function () {
  board = $("#board")[0];
  window.addEventListener("resize", (e) => {
    handlePageResize(e.target);
  });
  windowSize = { height: window.innerHeight, width: window.innerWidth };
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      closeModal("all");
    }
  });
  window.addEventListener("mousemove", (e) => {
    if (e.which === 1 && leftClickTarget !== "") {
      let el = leftClickTarget.el;
      if (!el) return;
      let range = leftClickTarget.range;
      if (range) {
        if (!(e.clientX > range.xFrom && e.clientX < range.xTo && e.clientY > range.yFrom && e.clientY < range.yTo)) {
          leftClickTarget.range = {};
          el.style.transform = `translate(${leftClickTarget.offset.x}px, ${leftClickTarget.offset.y}px)`;
          leftClickTarget.el.style.top = e.clientY - board.getBoundingClientRect().top + "px";
          leftClickTarget.el.style.left = e.clientX - board.getBoundingClientRect().left + "px";
          leftClickTarget.el.style.position = "absolute";
        }
      } else {
        leftClickTarget.el.style.top = e.clientY - board.getBoundingClientRect().top + "px";
        leftClickTarget.el.style.left = e.clientX - board.getBoundingClientRect().left + "px";
      }
    }
  });
  window.addEventListener("mouseup", function (event) {
    if (event.which === 1 && leftClickTarget.el) {
      leftClickTarget.el.style.position = "static";
      leftClickTarget.el.style.transform = "none";
      leftClickTarget.el.style.height = "unset";
      leftClickTarget.el.style.zIndex = 0;
    }
  });

  let spots = $(".spot");
  spots.on("mousedown", function (event) {
    if (event.which === 1) {
      handleDragPiece(event);
    } else if (event.which === 3) {
      rightClickTarget = event.target;
    }
  });
  spots.on("mouseup", function (event) {
    if (event.which === 1) {
      spotClicked(event.target);
    }
  });
  spots.on("contextmenu", function (event) {
    handleContextMenu(event);
  });

  spotEls = spots;

  // let pieces = [
  //   "wp",
  //   "wn",
  //   "wb",
  //   "wq",
  //   "wk",
  //   "wr",
  //   "bp",
  //   "bn",
  //   "bb",
  //   "bq",
  //   "bk",
  //   "br",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  // ];
  // #region TESTING
  // for (i = 0; i < spotEls.length; i++) {
  //   let piece = pieces[Math.floor(Math.random() * 51)];
  //   if (piece !== "") {
  //     let img = document.createElement("img");
  //     img.src = `./assets/pieces/neo/${piece}.png`;
  //     spotEls[i].appendChild(img);
  //   }
  // }

  // let historyEl = $(".history-wrapper")[0];
  // for (i = 0; i < 10; i++) {
  //   let row = document.createElement("div");
  //   row.classList.add("move-set");
  //   row.dataset.rowid = i + 1;
  //   let move1 = document.createElement("span");
  //   move1.innerText = randomMove();
  //   row.appendChild(move1);
  //   let move2 = document.createElement("span");
  //   move2.innerText = randomMove();
  //   row.appendChild(move2);
  //   historyEl.appendChild(row);
  // }
  // #endregion

  currLoadAnim = Math.floor(Math.random() * loadingArr.length);
  // currLoadAnim = loadingArr.length - 1;
  // loading();

  let dropdownEls = document.querySelectorAll(".dropdown");
  dropdownEls.forEach((el) => {
    el.addEventListener("click", (event) => {
      event.stopPropagation();

      let allDropdowns = document.querySelectorAll(".dropdown");
      allDropdowns.forEach((el) => {
        el.dataset.open = "false";
      });

      let dropdown = event.target;
      let optionList = document.querySelector(`.option-list[data-setting='${dropdown.dataset.setting}']`);
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
          optionList.scroll({ top: 0 });
          optionList.scroll({
            top:
              (optionList.getBoundingClientRect().top +
                optionList.getBoundingClientRect().height / 2 -
                (selectedEl.getBoundingClientRect().top + selectedEl.getBoundingClientRect().height / 2)) *
              -1,
          });
          let selectedMiddle = selectedEl.getBoundingClientRect().top + selectedEl.getBoundingClientRect().height / 2;
          let dropdownMiddle = dropdown.getBoundingClientRect().top + dropdown.getBoundingClientRect().height / 2;
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
});

function initializePlayerInfo(whiteInfo, blackInfo) {
  $(".white-name").text(whiteInfo.name);
  $(".white-name").attr("title", whiteInfo.name);
  $(".white-elo").text(whiteInfo.elo);
  $(".redirect-white-acct").attr("href", `account/${whiteInfo.index}`);
  if (whiteInfo.pfp) $(".white-pfp").attr("src", `./pfps/${whiteInfo.pfp}`);
  $(".black-name").text(blackInfo.name);
  $(".black-name").attr("title", blackInfo.name);
  $(".black-elo").text(blackInfo.elo);
  $(".redirect-black-acct").attr("href", `account/${blackInfo.index}`);
  if (blackInfo.pfp) $(".black-pfp").attr("src", `./pfps/${blackInfo.pfp}`);

  if (whiteInfo.elo >= 1000) {
    let parent = $(".white-medal")[0];
    let el = document.createElement("span");
    if (whiteInfo.elo >= 1200) {
      el.innerText = "GM";
      el.title = "Grandmaster";
    } else {
      el.innerText = "IM";
      el.title = "International Master";
    }
    parent.appendChild(el);
  }
  if (blackInfo.elo >= 1000) {
    let parent = $(".black-medal")[0];
    let el = document.createElement("span");
    if (blackInfo.elo >= 1200) {
      el.innerText = "GM";
      el.title = "Grandmaster";
    } else {
      el.innerText = "IM";
      el.title = "International Master";
    }
    parent.appendChild(el);
  }

  if (whiteInfo.index === userID) {
    userIsWhite = true;
  } else {
    userIsWhite = false;
    if (userSettings.flipboard !== false) {
      $("#board").addClass("flipped");
      $(".default-view").addClass("flipped");
    }
  }
}
function initializeUserInfo(userInfo) {
  userID = userInfo.index;

  $(".user-pfp").attr("src", `./pfps/${userInfo.pfp}`);
  $(".user-name").text(userInfo.name);
  userSettings = userInfo.settings;
  let tempInputs = $(".setting-input");
  for (let el of tempInputs) {
    let key = el.dataset.setting ?? el.id;
    settingInputs[key] = el;
  }

  for (let [key, value] of Object.entries(userSettings)) {
    let el = settingInputs[key];

    if (el.tagName === "INPUT") {
      if (el.type === "checkbox") {
        el.checked = value;
      } else if (el.type === "text") {
        el.value = value;
      }
    } else if (el.classList.contains("dropdown")) {
      el.innerText = value;
    }
    changeSetting(key, value);
  }
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
function toggleAccountSettings(e) {
  e.stopPropagation();
  $(".account-settings").toggleClass("open");
}

function playerModal(player) {
  let playerViewEl = $(`.${player}-account-view`);
  if (playerViewEl.length > 0) {
    $(".default-view").removeClass("display");
    playerViewEl.addClass("display");
  }
}

function modalBodyClick(event) {
  event.stopPropagation();
  document.querySelector(".account-settings").classList.remove("open");
  for (const el in dropdowns) {
    dropdowns[el].dataset.open = "false";
  }
}
function handleDragPiece(event) {
  if (!game) return;

  event.preventDefault();
  let el = event.target;
  let possible = game.getMovesOf(parseInt(el.dataset.spotid) - 1, true);
  if (possible !== null) {
    game.displayCurrentMove();
    if (selected) {
      selected.classList.remove("highlight");
      $(".dot").removeClass("dot");
    }
    el.classList.add("highlight");
    possible.forEach((spot) => {
      $(`.spot[data-spotid='${coordsToIndex(spot.rank, spot.file) + 1}']`).addClass("dot");
    });
    selected = el;

    if (el.children.length > 0) {
      let img = el.children[0];
      let imgWidth = img.getBoundingClientRect().width;
      let imgHeight = img.getBoundingClientRect().height;
      let imgY = img.getBoundingClientRect().top;
      let imgX = img.getBoundingClientRect().left;
      img.style.width = imgWidth + "px";
      img.style.height = imgHeight + "px";
      img.style.zIndex = 2;
      let xOffset = imgX - event.clientX;
      let yOffset = imgY - event.clientY;
      xOffset = xOffset + (event.clientX - (imgX + imgWidth / 2)) / 2;
      yOffset = yOffset + (event.clientY - (imgY + imgHeight / 2)) / 2;

      let elRect = el.getBoundingClientRect();
      let elRange = { xFrom: elRect.left, xTo: elRect.right, yFrom: elRect.top, yTo: elRect.bottom };

      leftClickTarget = { el: img, offset: { x: xOffset, y: yOffset }, range: elRange };
    }
  } else {
    leftClickTarget = { el: null };
  }
}
function spotClicked(el) {
  if (loadingCont) {
    stopLoading();
    loadingCont = false;
  }
  if (selected) {
    if (el !== selected) {
      game.attemptMove(parseInt(selected.dataset.spotid) - 1, parseInt(el.dataset.spotid) - 1);
      selected.classList.remove("highlight");
      $(".dot").removeClass("dot");
      selected = undefined;
      removeArrows();
      removeHighlights();
    }
  } else {
    removeHighlights();
    removeArrows();
  }
  // attempt to move
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
      if (currentArrow.from === rightClickTarget.dataset.spotid && currentArrow.to === e.target.dataset.spotid) {
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
    !(windowSize.height === window.innerHeight && windowSize.width === window.innerWidth)
  ) {
    // arrows
    let tempArrows = removeArrows();
    tempArrows.forEach((arrow) => {
      createArrow($(`.spot[data-spotid=${arrow.from}]`)[0], $(`.spot[data-spotid=${arrow.to}]`)[0]);
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
    (Math.abs(yDiff - height * 2) < height / 2 && Math.abs(xDiff - width) < width / 2) ||
    (Math.abs(yDiff - height) < height / 2 && Math.abs(xDiff - width * 2) < width / 2)
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
      if (el.classList.contains("dark-highlight")) el.classList.remove("dark-highlight");
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
      highlights = [...document.querySelectorAll(".spot.highlight"), ...document.querySelectorAll(".spot.dark-highlight")];
      if (highlights.length > 0) {
        highlights.forEach((tempEl) => {
          tempEl.classList.remove("highlight", "dark-highlight");
        });
      }
  }
}

function setValue(setting, value) {
  changeSetting(setting, value);
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
function changeSetting(setting, value) {
  // change user setting with API

  if (value === defaultSettings[setting]) {
    // setting is default
    alterPlayerSetting(userID, setting, "");
  } else {
    alterPlayerSetting(userID, setting, value);
  }
  userSettings[setting] = value;
  switch (setting) {
    case "animations":
      if (value) {
        document.body.classList.remove("noAnimate");
      } else {
        document.body.classList.add("noAnimate");
      }
      break;
    case "flipboard":
      if (value) {
        if (!userIsWhite) {
          $("#board").addClass("flipped");
          $("#player-info > .default-view").addClass("flipped");
        }
      } else {
        $("#board").removeClass("flipped");
        $("#player-info > .default-view").removeClass("flipped");
      }
      break;
    case "coordinates":
      if (value) {
        $(".coords").addClass("display");
      } else {
        $(".coords").removeClass("display");
      }
      break;
    case "coordspos":
      if (value.includes("Right")) {
        $(".rank-coords").removeClass("left-coords");
        $(".rank-coords").addClass("right-coords");
      } else {
        $(".rank-coords").addClass("left-coords");
        $(".rank-coords").removeClass("right-coords");
      }
      if (value.includes("Top")) {
        $(".file-coords").removeClass("bottom-coords");
        $(".file-coords").addClass("top-coords");
      } else {
        $(".file-coords").addClass("bottom-coords");
        $(".file-coords").removeClass("top-coords");
      }
      break;
    case "largepieces":
      let spotWidth = spotEls[0].getBoundingClientRect().width;
      if (value) {
        $(".spot > img").css("width", spotWidth * 0.9 + "px");
      } else {
        $(".spot > img").css("width", spotWidth * 0.75 + "px");
      }
      break;
    case "piecestyle":
      // let pieceEls = document.querySelectorAll(".spot > img");
      // pieceEls = [...pieceEls, ...document.querySelectorAll(".piece-captures > img")];
      let pieceEls = document.querySelectorAll(".update-ps");
      pieceEls.forEach((el) => {
        let piece = el.src.substring(el.src.lastIndexOf("/") + 1);
        el.src = `./assets/pieces/${value}/${piece}`;
      });
      break;
    case "possiblemoves":
      if (value) {
        $("#board").removeClass("no-dot");
      } else {
        $("#board").addClass("no-dot");
      }
      break;
    case "movenums":
      if (value === "Always") {
        $(".move-set").removeClass("no-num");
        $(".move-set").removeClass("hover-num");
      } else if (value === "On Hover") {
        $(".move-set").removeClass("no-num");
        $(".move-set").addClass("hover-num");
      } else if (value === "Never") {
        $(".move-set").removeClass("hover-num");
        $(".move-set").addClass("no-num");
      }
      break;
    case "historyscroll":
      // idrk
      break;
    case "disambiguity":
      rewriteHistory();
      break;
    case "usesymbols":
      rewriteHistory();
      break;
    case "promotion":
      rewriteHistory();
      break;
    case "castling":
      rewriteHistory();
      break;
    case "enpassant":
      rewriteHistory();
      break;
    case "check":
      rewriteHistory();
      break;
    case "checkmate":
      rewriteHistory();
      break;
  }
}

function rewriteHistory() {
  if (!game) return;
  $(".history-wrapper")[0].innerHTML = "";
  let history = game.passHistory().splice(1);
  history.forEach((move) => {
    updateHistory(move.lastMove);
  });
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
        res += alphabet[Math.round(Math.random() * 7)] + alphabet[Math.round(Math.random() * 7)] + (Math.round(Math.random() * 7) + 1);
      } else {
        res += Math.round(Math.random() * 7) + 1 + alphabet[Math.round(Math.random() * 7)] + (Math.round(Math.random() * 7) + 1);
      }
    }
  } else {
    res += alphabet[Math.round(Math.random() * 7)] + (Math.round(Math.random() * 7) + 1);
  }
  return res;
}
function makeArrows(fromMin = 1, fromMax = 64, toMin = 1, toMax = 64, only = "both", clearAfter = true, timeControl = 5) {
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
      if ((only === "forwards" && i >= j) || (only === "backwards" && i <= j)) cont = false;
      if (((only === "backwards" && i - 1 === j) || j === toMax) && clearAfter) isLast = true;
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
    console.log("operation took " + timeDidTake + " second(s); took " + diff + " second(s) longer than expected.");
    if (clearAfter) removeArrows();
  }, counter * timeControl + 20);
  return "operation should take " + (counter * timeControl) / 1000 + " second(s).";
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
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
      ],
    },
    { remove: [28, 29, 36, 37], add: [] },
    { remove: [19, 20, 21, 22, 27, 30, 35, 38, 43, 44, 45, 46], add: [] },
    {
      remove: [10, 11, 12, 13, 14, 15, 18, 23, 26, 31, 34, 39, 42, 47, 50, 51, 52, 53, 54, 55],
      add: [],
    },
    {
      remove: [1, 2, 3, 4, 5, 6, 7, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57, 58, 59, 60, 61, 62, 63, 64],
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
      removeHighlights("normal");
      let lastAnim = currLoadAnim;
      let rand = Math.floor(Math.random() * (loadingArr.length - 1));
      if (rand >= lastAnim) rand++;
      currLoadAnim = rand;
      loadingProgress = 0;
      if (loadingCont) loading();
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
  removeHighlights("normal");
  loadingCont = false;
}
// #endregion

// #region called by game class

function display(pos) {
  // pos is in full string form one long string with no indication of row ends (implied 8 spots per), spaces for empty spots

  let piece;
  let el;

  for (i = 0; i < pos.length; i++) {
    el = spotEls[i];

    if (pos[i] !== " ") {
      if (pos[i].toLowerCase() === pos[i]) {
        piece = "b" + pos[i];
      } else {
        piece = "w" + pos[i].toLowerCase();
      }
      let src = `${userSettings.piecestyle ?? "neo"}/${piece}.png`;
      let children = el.children;
      let hasSameImg = false;
      if (children.length > 0) {
        for (j = 0; j < children.length; j++) {
          if (children[j].tagName === "IMG") {
            if (children[j].src.includes(src)) {
              hasSameImg = true;
            } else {
              children[j].remove();
            }
          }
        }
      }
      if (!hasSameImg) {
        let img = document.createElement("img");
        img.src = `./assets/pieces/${src}`;
        img.classList.add("update-ps");
        if (userSettings.largepieces) {
          let spotWidth = spotEls[0].getBoundingClientRect().width;
          img.style.width = spotWidth * 0.9 + "px";
        }
        el.appendChild(img);
      }
    } else {
      let children = el.children;
      if (children.length > 0) {
        for (j = 0; j < children.length; j++) {
          children[j].remove();
        }
      }
    }
  }

  // if (el.child)
}
function displayingMove(move) {
  let moveEls = $(".move-set > span");
  if (displayedMoveEl) displayedMoveEl.classList.remove("marked");

  if (!(move === moveEls.length || move === 0)) {
    let moveEl = moveEls[move - 1];
    moveEl.scrollIntoView({ block: "center", behavior: "smooth" });
    displayedMoveEl = moveEl;
    moveEl.classList.add("marked");
  }
}
function openPromotionPanel(player, spotIndex) {
  let el = $(`.${player}-promotion`);
  el.addClass("open");
  let parent = spotEls[spotIndex];
  if (parent) {
    let parentRect = parent.getBoundingClientRect();
    let docHeight = window.innerHeight;
    el.css("left", parentRect.left + "px");
    el.css("width", parentRect.width + "px");
    if (parentRect.top < docHeight / 2) {
      el.css("top", parentRect.top + "px");
      el.css("flex-direction", "column");
    } else {
      el.css("bottom", docHeight - (parentRect.top + parentRect.height) + "px");
      el.css("flex-direction", "column-reverse");
    }
  }
}
function closePromotionPanel(player) {
  $(`.${player}-promotion`).removeClass("open");
}
function updateCaptures(whiteMissing, blackMissing) {
  let whiteCapture = {
    p: 0,
    n: 0,
    b: 0,
    q: 0,
  };
  blackMissing.forEach((piece) => {
    whiteCapture[piece]++;
  });
  for (const [key, value] of Object.entries(whiteCapture)) {
    let parent = $(`.white-${key}`)[0];
    let number = parent.children.length;
    if (number > value) {
      for (i = 0; i < number - value; i++) {
        parent.children[0].remove();
      }
    }
    if (value > 0 && number !== value) {
      for (i = 0; i < value - number; i++) {
        parent.innerHTML += `<img class="update-ps" src="assets/pieces/${userSettings.piecestyle ?? defaultSettings.piecestyle}/b${key}.png" />`;
      }
    }
  }
  let blackCapture = {
    p: 0,
    n: 0,
    b: 0,
    q: 0,
  };
  whiteMissing.forEach((piece) => {
    blackCapture[piece.toLowerCase()]++;
  });
  for (const [key, value] of Object.entries(blackCapture)) {
    let parent = $(`.black-${key}`)[0];
    let number = parent.children.length;
    if (number > value) {
      for (i = 0; i < number - value; i++) {
        parent.children[0].remove();
      }
    }
    if (value > 0 && number !== value) {
      for (i = 0; i < value - number; i++) {
        parent.innerHTML += `<img class="update-ps" src="assets/pieces/${userSettings.piecestyle ?? defaultSettings.piecestyle}/w${key}.png" />`;
      }
    }
  }
}
const unicodeForPieces = { wn: "♘", wb: "♗", wr: "♖", wq: "♕", wk: "♔", bn: "♞", bb: "♝", br: "♜", bq: "♛", bk: "♚" };
function updateHistory(move) {
  let not = "";

  if (move.special === "short castle") {
    not = `${userSettings.castling ?? defaultSettings.castling}-${userSettings.castling ?? defaultSettings.castling}`;
  } else if (move.special === "long castle") {
    not = `${userSettings.castling ?? defaultSettings.castling}-${userSettings.castling ?? defaultSettings.castling}-${
      userSettings.castling ?? defaultSettings.castling
    }`;
  } else {
    move.piece = move.piece.toUpperCase();
    if (move.piece !== "P") {
      if (userSettings.usesymbols) {
        let playerNot = move.piece.toUpperCase() === move.piece ? "w" : "b";
        not += unicodeForPieces[`${playerNot}${move.piece.toLowerCase()}`];
      } else not += move.piece;
    }
    let userDisambiguity = userSettings.disambiguity ?? defaultSettings.disambiguity;
    if (move.disambiguity.file || userDisambiguity) {
      not += fileLetter(move.from.file);
    }
    if (move.disambiguity.rank || userDisambiguity) {
      not += move.from.rank;
    }
    if (move.capture || move.special === "en passant") {
      not += "x";
    }
    not += fileLetter(move.file) + move.rank;

    if (move.special === "en passant") {
      not += " " + (userSettings.enpassant ?? defaultSettings.enpassant);
    }
    if (move.special === "promotion") {
      not += (userSettings.promotion ?? defaultSettings.promotion).replace("PIECE", move.promoteTo.toUpperCase());
    }
    if (move.check) {
      if (move.checkmate) not += userSettings.checkmate ?? defaultSettings.checkmate;
      else not += userSettings.check ?? defaultSettings.check;
    }
  }

  let grand = $(".history-wrapper")[0];
  let el = document.createElement("span");
  let parent;
  el.innerText = not;
  if (grand.children.length > 0 && grand.children[grand.children.length - 1].children.length !== 2) {
    parent = grand.children[grand.children.length - 1];
    parent.appendChild(el);
  } else {
    parent = document.createElement("div");
    parent.classList.add("move-set");
    switch (userSettings.movenums ?? defaultSettings.movenums) {
      case "Never":
        parent.classList.add("no-num");
        break;
      case "On Hover":
        parent.classList.add("hover-num");
        break;
    }
    parent.dataset.rowid = grand.children.length + 1;
    parent.appendChild(el);
    grand.appendChild(parent);
  }

  // if ((userSettings.scrollhistory ?? defaultSettings.scrollhistory) === "")
  switch (userSettings.historyscroll ?? defaultSettings.historyscroll) {
    case "Always":
      grand.scroll({ top: grand.scrollHeight, behavior: "smooth" });
      break;
    case "Near Bottom":
      if (Math.abs(grand.scrollHeight - grand.getBoundingClientRect().height - grand.scrollTop) < parent.getBoundingClientRect().height * 1.5) {
        grand.scroll({ top: grand.scrollHeight, behavior: "smooth" });
      }
      break;
  }
}
function gameEnd(res) {
  let elList = document.getElementsByClassName("ended-by");
  for (i in elList) {
    elList[i].innerText = res.endedBy;
  }
  elList = document.getElementsByClassName("white-result");
  for (i in elList) {
    elList[i].innerText = res.score.white;
  }
  elList = document.getElementsByClassName("black-result");
  for (i in elList) {
    elList[i].innerText = res.score.black;
  }
  $(".game-result").addClass("display");
}

let boardAlphabet = "abcdefgh";
function fileLetter(fileInNum) {
  return boardAlphabet[fileInNum - 1];
}
function fileNum(fileInLett) {
  return boardAlphabet.indexOf(fileInLett) + 1;
}

// #endregion
