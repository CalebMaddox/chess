var ready = true;
var pos;
var currentPlayer = "w";
var selectedSpot = { pos: "", piece: "" };
var w_en_passant = { pos: "", age: "0" };
var b_en_passant = { pos: "", age: "0" };
var w_castleLong = true;
var w_castleShort = true;
var b_castleLong = true;
var b_castleShort = true;

window.addEventListener("load", function () {
  let favicon = document.createElement("link");
  favicon.setAttribute("rel", "shortcut icon");
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    favicon.setAttribute("href", "assets/w_king.png");
  } else {
    favicon.setAttribute("href", "assets/b_king.png");
  }
  document.querySelector("head").appendChild(favicon);
  for (i = 0; i < spots.length; i++) {
    document.getElementById(
      `spot${spots[i].pos}`
    ).style.backgroundImage = `url(assets/${spots[i].piece}.png)`;
  }
});

function spotClicked(element) {
  if (!ready) return;
  let dots = document.getElementsByClassName("dot");
  pos = element.id.substr(4, 2);
  selectedSpot = spots.find((x) => x.pos == pos);
  if (selectedSpot.row == "") {
    return;
  } else {
    if (selectedSpot.piece.substring(0, 1) == currentPlayer) {
      for (i = dots.length - 1; i >= 0; i--) {
        dots[i].classList.remove("dot");
      }
    }
    if (selectedSpot.piece.substring(0, 1) != currentPlayer) {
      move(selectedSpot.piece);
    } else {
      select();
    }
  }
  //   else {
  //     move(selectedSpot.piece);
  //   }
}
