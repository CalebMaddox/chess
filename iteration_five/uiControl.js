function display(board, style) {
  let rank;
  let fileLetter;

  for (i = 1; i <= board.length; i++) {
    rank = i;
    for (j = 1; j <= board[i - 1].length; j++) {
      fileLetter = numToLetter(j);

      let parentEl = $(
        `.spot[data-file="${fileLetter}"][data-rank="${rank}"]`
      )[0];

      let piece = board[i - 1][j - 1];

      while (parentEl.firstChild) {
        parentEl.removeChild(parentEl.firstChild);
      }

      if (piece !== "") {
        if (piece.toLowerCase() === piece) {
          piece = `b${piece}`;
        } else {
          piece = `w${piece.toLowerCase()}`;
        }

        let image = document.createElement("img");
        image.src = `assets/pieces/${style}/${piece}.png`;
        image.alt = piece;

        parentEl.appendChild(image);
      }
    }
  }
}

function drawDots(dots, currentDots) {
  if (currentDots.length > 0) {
    currentDots.forEach((dot) => {
      $(
        `.spot[data-rank="${dot.rank}"][data-file="${numToLetter(dot.file)}"]`
      ).removeClass("dot");
    });
    currentDots = [];
  }

  dots.forEach((dot) => {
    currentDots.push({ file: dot.file, rank: dot.rank });
    $(
      `.spot[data-rank="${dot.rank}"][data-file="${numToLetter(dot.file)}"]`
    ).addClass("dot");
  });

  return currentDots;
}

function highlight(spots, currentHighlights) {
  if (currentHighlights.length > 0) {
    currentHighlights.forEach((spot) => {
      $(
        `.spot[data-rank="${spot.rank}"][data-file="${numToLetter(spot.file)}"]`
      ).removeClass("highlighted");
    });
    currentHighlights = [];
  }

  spots.forEach((spot) => {
    currentHighlights.push({ file: spot.file, rank: spot.rank });
    $(
      `.spot[data-rank="${spot.rank}"][data-file="${numToLetter(spot.file)}"]`
    ).addClass("highlighted");
  });

  return currentHighlights;
}

function clearBoardSignals() {
  $(".spot").removeClass("dot");
  $(".spot").removeClass("highlighted");
}

function updateHistory(move, notationSpecification, numMoves, scrollSetting) {
  let parentEl = $(`.history`)[0];

  if (parentEl.length === 0) {
    console.error("couldn't find history container");
    return;
  }

  let notation = "";

  if (move.shortCastle) {
    // short castle
    notation = notationSpecification.shortCastle;
  } else if (move.longCastle) {
    // long castle
    notation = notationSpecification.longCastle;
  } else {
    // no castling
    if (move.pieceNotation !== "P") {
      // piece is not pawn
      notation += move.pieceNotation;
    } else if (move.capture) {
      if (
        !notationSpecification.disambiguityWhenNotNecessary &&
        !move.disambiguity.necessary.file
      )
        notation += numToLetter(move.disambiguity.file);
    }

    if (notationSpecification.disambiguityWhenNotNecessary) {
      // settings specify to always use disambiguity
      notation += `${numToLetter(move.disambiguity.file)}${
        move.disambiguity.rank
      }`;
    } else {
      if (move.disambiguity.necessary.file) {
        // if file disambiguity is necessary
        notation += numToLetter(move.disambiguity.file);
      }
      if (move.disambiguity.necessary.rank) {
        // if rank disambiguity is necessary
        notation += move.disambiguity.rank;
      }
    }

    if (move.capture) {
      // if move was a capture
      notation += notationSpecification.capture;
    }

    notation += `${numToLetter(move.to.file)}${move.to.rank}`;

    if (move.promotion.is) {
      // move promoted a pawn
      let addTo = notationSpecification.promotion;
      addTo = addTo.replace("PIECE", move.promotion.promoteTo.toUpperCase());

      notation += addTo;
    }
  }
  if (move.check) {
    // move puts opponent in check
    if (move.checkmate) {
      // move puts opponenet in checkmate
      notation += notationSpecification.checkmate;
    } else notation += notationSpecification.check;
  }

  if (move.enPassant) {
    // move is an en passant
    notation += " " + notationSpecification.enPassant;
  }

  let scroll = false;
  if (scrollSetting === "always") {
    scroll = true;
  } else if (scrollSetting === "near bottom") {
    scroll =
      parentEl.parentNode.scrollHeight - parentEl.parentNode.clientHeight <=
      parentEl.parentNode.scrollTop +
        parentEl.querySelector(".table-row:last-child").getBoundingClientRect()
          .height;
  }

  let el;
  if (numMoves % 2 === 1) {
    el = document.createElement("div");
    el.classList.add("table-row");
    el.dataset.nth = Math.floor(numMoves / 2 + 1);
  } else {
    el = parentEl.lastChild;
  }
  let childEl = document.createElement("span");
  childEl.classList.add("move");
  childEl.innerText = notation;
  el.appendChild(childEl);
  parentEl.appendChild(el);

  if (scroll)
    parentEl.parentNode.scroll({ top: el.offsetTop, behavior: "smooth" });
}

function updateCaptures(piece, player, pieceStyle) {
  let parentEl = $(`.${player}__captures > .${piece}`)[0];

  let el = document.createElement("img");
  el.src = `assets/pieces/${pieceStyle}/${
    player === "white" ? "b" : "w"
  }${piece}.png`;
  el.alt = piece;
  parentEl.appendChild(el);
}

function openPromotionPrompt(player, spot) {
  let promptEl = $(`.promotion-prompt__${player}`);

  promptEl[0].classList.add("open");
  let spotEl = $(
    `.spot[data-rank='${spot.rank}'][data-file='${numToLetter(spot.file)}']`
  )[0];

  if (player === "white") {
    promptEl.css("top", spotEl.getBoundingClientRect().top);
  } else {
    promptEl.css(
      "top",
      spotEl.getBoundingClientRect().bottom -
        promptEl[0].getBoundingClientRect().height
    );
  }
  promptEl.css("left", spotEl.getBoundingClientRect().left);
  promptEl.css("width", spotEl.getBoundingClientRect().width);
}

function toggleModal(el) {
  let parentEl = el.parentElement;
  let wasOpen = parentEl.dataset.opened;

  let modalEls = document.getElementsByClassName("modal-controller");

  for (i = 0; i < modalEls.length; i++) {
    modalEls[i].dataset.opened = "false";
  }

  if (wasOpen === "false") {
    parentEl.dataset.opened = "true";
  }
}

function toggleOpened(el) {
  if (el.dataset.opened === "false") {
    el.dataset.opened = "true";
  } else {
    el.dataset.opened = "false";
  }
}

function openDropdown(el) {
  let wasOpened = el.dataset.opened;

  let dropdowns = $(".dropdown");
  dropdowns.attr("data-opened", "false");

  if (wasOpened === "true") {
    el.dataset.opened = "false";
  } else {
    let optionsList = el.getElementsByClassName("option-list")[0];

    optionsList.scroll({ top: 0 });

    let options = optionsList.getElementsByClassName("option");
    let option;
    for (i = 0; i < options.length; i++) {
      if (options[i].dataset.value === el.dataset.value) {
        option = options[i];
      }
    }

    let middle =
      optionsList.clientHeight / 2 + optionsList.getBoundingClientRect().top;

    let optionHeight =
      option.clientHeight / 2 + option.getBoundingClientRect().top;

    let scrollNeeded = optionHeight - middle;

    optionsList.scroll({ top: scrollNeeded });

    el.dataset.opened = "true";
  }
}
