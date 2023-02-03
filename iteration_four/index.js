// #region general page functions \\

const settings = {
  theme: {
    type: "switch",
    action: "style html",
    options: {
      light: {},
      dark: {},
    },
  },
  piece_style: {
    type: "dropdown",
    action: "function changePieceStyle",
    options: {
      neo: "neo",
      classic: "classic",
    },
  },
};

var settingsOpened = false;

$(document).ready(function () {
  // onload:
  //  - apply any settings
  //  - any event listeners on elements should be nested in this to be sure that content is loaded before event listener is applied

  $("#settings-menu")[0].show(); // shows the modal, but it is off of the page

  $(".settings-component.setting-changed-on-click").click(function () {
    console.log("settings changed");
  });

  $(".spot").mousedown(function () {
    console.log(`spot ${$(this).attr("id")} mouse down`);
  });
  $(".spot").mouseup(function () {
    console.log(`spot ${$(this).attr("id")} mouse up`);
  });
});

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

// #region game logic functions \\

$(document).ready(function () {
  // on page load:
  //
});

// #endregion -=game logic functions=- //
