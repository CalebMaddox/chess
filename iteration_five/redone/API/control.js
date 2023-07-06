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
var playersInfo = `[
  {
    "name": "Player 1 asdgvbaskuvasyda",
    "elo": 600,
    "pfp": "aaaa.jpg",
    "games": [{ "id": 0, "opponent": 1 }]
  },
  {
    "name": "Player 2",
    "elo": 570,
    "pfp": "aaab.jpg",
    "games": [{ "id": 0, "opponent": 0 }]
  }
]`;
