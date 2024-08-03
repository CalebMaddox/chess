var game;

$(document).ready(function () {
  let playerId = document.cookie
    .split(";")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];

  if (!playerId) {
    $(".iframe-container.loginIframe").addClass("display");
  } else {
    let userInfo = readFromAPI("playersInfo", playerId);
    initializeUserInfo(userInfo);

    // find game
    let opponentId;
    let findOpp = findOpponent(playerId);
    loading();

    findOpp.then((res) => {
      opponentId = res.opponent;
      let white = res.color === "white" ? 1 : 2;
      game = createGame(playerId, opponentId, white);
    });
  }
});

function signOut() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  location.reload();
}

// function spotClicked() {}

// function highlightSpot() {}

// function undoMove() {}

// function redoMove() {}

// function navigateToMove() {}

// function removeReviewBranches() {}
