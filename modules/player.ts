import { Globals } from "./globals.js";
import { Log } from "./log.js";

class Player {
  listen() {
    document.body.addEventListener("click", this.click);
  }

  private click(e: MouseEvent) {
    Log.debug(
      `Player::click: clicked: clientX = ${e.clientX}, clientY = ${e.clientY}`
    );
    let position = Globals.draw.getPosition(e.clientX, e.clientY);

    if (!position) {
      return;
    }
    var x = position[0];
    var y = position[1];
    Globals.board.addAtom(x, y);
    Log.debug(`Player::click: Board[${x}][${y}]`);
    Globals.draw.all();
  }
}

export { Player };
