function createGame(player1, player2, whitePlayer) {
  let whiteID;
  let blackID;
  if (whitePlayer === 1) {
    whiteID = player1;
    blackID = player2;
  } else {
    whiteID = player2;
    blackID = player1;
  }

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

  const gameID = APIPush("gamesInfo", {
    whitePlayer: whiteID,
    blackPlayer: blackID,
    event: event,
    site: "Glorichess",
    date: UTCdate.toISOString(),
    round: round,
    result: null,
  });

  stopLoading();
  initializePlayerInfo({ ...white, id: whiteID }, { ...black, id: blackID });

  const game = new Game(gameID);

  return game;
}
