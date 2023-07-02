$(document).ready(function () {
  const game = new Game();

  let body = $("body")[0];
  let img = document.createElement("img");
  img.src = `./pfps/${game.gameInfo.whitePlayer.playerID}.jpg`;

  body.appendChild(img);
});
