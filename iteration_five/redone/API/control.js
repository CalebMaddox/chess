function readFromAPI(apiFile, valueToBeRead) {
  switch (apiFile) {
    case "gamesInfo":
      return JSON.parse(gamesInfo)[valueToBeRead];
    case "playersInfo":
      return JSON.parse(playersInfo)[valueToBeRead];
    default:
      return false;
  }
}
function APIPush(apiFile, pushThis) {
  var object;
  var res;
  switch (apiFile) {
    case "gamesInfo":
      object = JSON.parse(gamesInfo);
      res = object.length;
      object.push(pushThis);
      gamesInfo = JSON.stringify(object);
      return res;
    case "playersInfo":
      object = JSON.parse(playersInfo);
      res = object.length;
      object.push(pushThis);
      playersInfo = JSON.stringify(object);
      return res;
    default:
      return false;
  }
}
function havePlayersPlayed(player1, player2) {
  let playerInfo = readFromAPI("playersInfo", player1);
  let i = 0;
  playerInfo.games.forEach((game) => {
    if (game.opponent === player2) i++;
  });
  if (i > 0) {
    return { have: true, times: i };
  } else {
    return { have: false, times: null };
  }
}
function attemptLogin() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let playerInfo = JSON.parse(playersInfo);
  let user = playerInfo.find((user) => user.name === username);
  if (!user) return false;
  if (user.password === password) {
    return playerInfo.indexOf(user);
  } else {
    return false;
  }
}
function findOpponent(playerID) {
  return new Promise(function (resolve) {
    playerID = parseInt(playerID);

    let playerElo = readFromAPI("playersInfo", playerID).elo;

    let possible = JSON.parse(playersInfo);
    possible.splice(playerID, 1);
    possible.sort((a, b) => {
      return Math.abs(a.elo - playerElo) - Math.abs(b.elo - playerElo);
    });
    setTimeout(
      () => {
        resolve({ opponent: possible[0].index, color: Math.random() > 0.5 ? "white" : "black" });
      },
      // Math.random() * 50000 +
      500
    );
  });
}
function alterPlayerSetting(playerID, setting, value) {
  let playerInfo = JSON.parse(playersInfo);
  if (value === "") {
    delete playerInfo[playerID].settings[setting];
  } else playerInfo[playerID].settings[setting] = value;
  playersInfo = JSON.stringify(playerInfo);
}

var gamesInfo = `[
  {
    "whitePlayer": 0,
    "blackPlayer": 1,
    "event": "GloriChess Game",
    "site": "Glorichess",
    "date": "(ISO 8601 Date string)",
    "round": 0,
    "result": 0,
    "history": [{"position": "(fen position)", "lastMove": {"from": "(fileRank)", "to": "(fileRank)"}}, "..."]
  }
]`;
var playersInfo = `[{"name":"Player 1","password":"ooga","elo":600,"pfp":"aaaa.jpg","games":[{"id":0,"opponent":1}],"settings":{"largepieces":true,"piecestyle":"Bare"},"index":0},{"name":"Player 2","password":"ogaa","elo":600,"pfp":"aaab.jpg","games":[{"id":0,"opponent":0}],"settings":{},"index":1},{"name":"Player 3","password":"ogga","elo":600,"pfp":"aaab.jpg","games":[],"settings":{"flipboard": false},"index":2}]`;
