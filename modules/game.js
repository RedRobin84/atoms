import { Draw } from "./draw.js";
import { Player } from "./player.js";

var Game = {};

Game.start = function () {
  Draw.all();
  Player.listen();
};

export { Game };
