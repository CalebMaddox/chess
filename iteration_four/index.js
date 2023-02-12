// #region general page functions \\

var settingsOpened = false;
var pageState = "preGame";

$(document).ready(function () {
  // onload:
  //  - apply any settings
  //  - any event listeners on elements should be nested in this to be sure that content is loaded before event listener is applied

  $("#settings-menu")[0].show(); // shows the modal, but it is off of the page

  $(".settings-component.setting-changed-on-click").click(function () {
    console.log("settings changed");
  });

  $(".spot").mousedown(function (event) {
    if (event.which != 1) return;
    console.log(`spot ${$(this).attr("id")} mouse down`);
  });
  $(".spot").mouseup(function (event) {
    if (event.which != 1) return;
    console.log(`spot ${$(this).attr("id")} mouse up`);
  });

  $("#custom-piece-img-w").change(function (e) {
    let file = this.files[0];
    customPieceFileInputed("w", file);
  });
  $("#custom-piece-img-b").change(function (e) {
    let file = this.files[0];
    customPieceFileInputed("b", file);
  });
});

function changeState(state) {
  let hideNow = $(`.on_${pageState}`);
  for (i = 0; i < hideNow.length; i++) {
    hideNow[i].ariaHidden = "true";
  }
  pageState = state;
  let showNow = $(`.on_${pageState}`);
  for (i = 0; i < showNow.length; i++) {
    showNow[i].ariaHidden = "false";
  }
}

function toggleSettings() {
  let modal = $("#settings-menu")[0];
  let wrapper = $("#page-wrapper")[0];
  let toggle = $("#toggle-settings")[0];

  if (settingsOpened) {
    settingsOpened = false;
    toggle.ariaExpanded = "false";
    modal.dataset.opened = "false";
    wrapper.dataset.faded = "false";
  } else {
    settingsOpened = true;
    toggle.ariaExpanded = "true";
    modal.dataset.opened = "true";
    wrapper.dataset.faded = "true";
  }
}

function sliderToggle(el) {
  if (el.dataset.checked == "true") {
    el.title = el.dataset.offTitle;
    el.dataset.checked = "false";
  } else {
    el.title = el.dataset.onTitle;
    el.dataset.checked = "true";
  }
}

function dropdownToggle(el) {
  let options = el.getElementsByClassName("dropdown-option");
  if (el.dataset.opened == "true") {
    for (i = 0; i < options.length; i++) {
      options[i].dataset.disabled = "true";
    }
    el.dataset.opened = "false";
  } else {
    el.dataset.opened = "true";
    setTimeout(() => {
      if (el.dataset.opened == "true") {
        for (i = 0; i < options.length; i++) {
          options[i].dataset.disabled = "false";
        }
      }
    }, 200);
  }
}

// #endregion -=general page functions=- //

// #region pre-game function \\

function customPieceFileInputed(player, file) {
  let reader = new FileReader();

  reader.onload = function () {
    $(`#custom-piece-img-display_${player}`)[0].innerHTML = "";

    let img = new Image();
    img.src = reader.result;

    $(`#custom-piece-img-display_${player}`)[0].appendChild(img);
  };

  reader.readAsDataURL(file);
}

// #endregion -=pre-game function \\

// #region game logic functions \\

// #region game data \\

var board = {
  a1: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  b1: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  c1: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  d1: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  e1: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  f1: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  g1: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  h1: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  a2: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  b2: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  c2: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  d2: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  e2: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  f2: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  g2: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  h2: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  a3: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  b3: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  c3: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  d3: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  e3: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  f3: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  g3: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  h3: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  a4: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  b4: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  c4: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  d4: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  e4: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  f4: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  g4: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  h4: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  a5: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  b5: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  c5: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  d5: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  e5: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  f5: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  g5: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  h5: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  a6: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  b6: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  c6: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  d6: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  e6: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  f6: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  g6: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  h6: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  a7: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  b7: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  c7: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  d7: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  e7: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  f7: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  g7: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  h7: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  a8: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  b8: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  c8: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  d8: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  e8: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  f8: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  g8: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
  h8: {
    occupied: false,
    piece: "",
    possibleMoves: [],
  },
};

// #endregion -=game data=- \\

// #endregion -=game logic functions=- //
