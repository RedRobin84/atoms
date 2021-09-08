import { Globals } from "./globals.js";
import { Player } from "./player.js";

class Game {
  private player: Player = new Player();

  start = function () {
    Globals.draw.all();
    this.player.listen();
  };
}

export { Game };
