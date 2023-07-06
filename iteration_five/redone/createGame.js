function doubleDigit(string) {
  string = string.toString();

  return string.length >= 2 ? string : "0" + string;
}
function tripleDigit(string) {
  string = string.toString();

  if (string.length === 1) {
    return "00" + string;
  } else if (string.length === 2) {
    return "0" + string;
  } else {
    return string;
  }
}

function createGame(whiteID, blackID) {
  let playersPlayedRes = havePlayersPlayed(whiteID, blackID);
  const playersHavePlayed = playersPlayedRes.have;
  const playersPlayedCount = playersPlayedRes.times;

  const event = "GloriChess Game";
  const date = new Date();
  const UTCdate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds()
  );
  const round = playersHavePlayed ? playersPlayedCount + 1 : 1;

  let white = readFromAPI("playersInfo", whiteID);
  let black = readFromAPI("playersInfo", blackID);

  let whiteInfo = {
    name: white.name,
    elo: white.elo,
  };
  let blackInfo = {
    name: black.name,
    elo: black.elo,
  };

  const gameID = APIPush("gamesInfo", {
    whitePlayer: whiteID,
    blackPlayer: blackID,
    event: event,
    site: "Glorichess",
    date: UTCdate.toISOString(),
    round: round,
    result: null,
  });

  let elements = initializeBoardHTML(
    { ...white, id: whiteID },
    { ...black, id: blackID }
  );

  const game = new Game(whiteInfo, blackInfo, gameID, elements);

  return game;
}
