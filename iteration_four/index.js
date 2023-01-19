var settingsOpened = false;

function spotClicked(pos) {
  console.log(pos);
}

function toggleSettings() {
  if (settingsOpened) {
    settingsOpened = false;
    document.getElementById("toggle-settings").ariaExpanded = "false";
  } else {
    settingsOpened = true;
    document.getElementById("toggle-settings").ariaExpanded = "true";
  }
}
