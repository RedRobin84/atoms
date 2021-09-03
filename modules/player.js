import { Draw } from "./draw.js";
import { Board } from "./board.js";

var Player = {};

Player.listen = function () {
  document.body.addEventListener("click", Player.click);
};

Player.click = function (e) {
  var position = Draw.getPosition(e.target);
  if (!position) {
    return;
  }
  var x = position[1];
  var y = position[0];
  Board[x][y]++;
  Draw.all();
};

export { Player };
