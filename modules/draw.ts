import { GameSettings } from "./gameSettings.js";
import { Globals } from "./globals.js";
import { Log } from "./log.js";

const LINE_THICKNESS_PX = 2;
const CELL_SIZE_PX = 60 + LINE_THICKNESS_PX;
const ATOM_RADIUS_PX = 7;
const POSITIONS = [
  [],
  [[1 / 2, 1 / 2]],
  [
    [1 / 4, 1 / 4],
    [3 / 4, 3 / 4],
  ],
  [
    [1 / 2, 1 / 2],
    [1 / 4, 1 / 4],
    [3 / 4, 3 / 4],
  ],
  [
    [1 / 4, 1 / 4],
    [1 / 4, 3 / 4],
    [3 / 4, 3 / 4],
    [3 / 4, 1 / 4],
  ],
];

class Draw {
  private _context: CanvasRenderingContext2D;

  constructor() {
    Log.debug(`Draw: constructing canvas.`);

    var newCanvas = document.createElement("canvas");
    var newCanvasSize =
      CELL_SIZE_PX * GameSettings.DEFAULT_BOARD_SIZE + LINE_THICKNESS_PX;
    newCanvas.width = newCanvasSize;
    newCanvas.height = newCanvasSize;

    this._context = newCanvas.getContext("2d");
    this._context.lineWidth = LINE_THICKNESS_PX;

    document.body.appendChild(newCanvas);
    Log.debug(
      `Draw: Canvas width: ${this._context.canvas.width}\n\tCanvas height: ${this._context.canvas.height}`
    );
    this.all();
  }

  all() {
    this._context.fillStyle = "#fff";
    var width = this._context.canvas.width;
    var height = this._context.canvas.height;

    this._context.fillRect(0, 0, width, height);
    this._lines();
    this._cells();
  }

  getPosition(cursorX: number, cursorY: number) {
    let rectangle = this._context.canvas.getBoundingClientRect();
    Log.debug(
      `Draw::getPosition: rectangle.left = ${rectangle.left}, rectangle.top = ${rectangle.top}`
    );

    cursorX -= rectangle.left;
    cursorY -= rectangle.top;

    if (cursorX < 0 || cursorX > rectangle.right) {
      Log.debug(
        `Draw::getPosition: Player clicked outside playing zone (horizontally)`
      );
      return null;
    }
    if (cursorY < 0 || cursorY > rectangle.bottom) {
      Log.debug(
        `Draw::getPosition: Player clicked outside playing zone (vertically)`
      );
      return null;
    }

    let cellX = Math.floor(cursorX / CELL_SIZE_PX);
    let cellY = Math.floor(cursorY / CELL_SIZE_PX);

    Log.debug(`Draw::getPosition: x = ${cellX}, y = ${cellY}`);
    return [cellX, cellY];
  }

  private _lines() {
    this._context.beginPath();

    //vertical lines
    for (let index = 0; index < GameSettings.DEFAULT_BOARD_SIZE + 1; index++) {
      var x = LINE_THICKNESS_PX / 2 + index * CELL_SIZE_PX;
      this._context.moveTo(x, 0);
      this._context.lineTo(x, this._context.canvas.height);
    }
    //horizontal lines
    for (let index = 0; index < GameSettings.DEFAULT_BOARD_SIZE + 1; index++) {
      var y = LINE_THICKNESS_PX / 2 + index * CELL_SIZE_PX;
      this._context.moveTo(0, y);
      this._context.lineTo(this._context.canvas.width, y);
    }
    this._context.stroke();
  }

  private _cells() {
    for (let x = 0; x < GameSettings.DEFAULT_BOARD_SIZE; x++) {
      for (let y = 0; y < GameSettings.DEFAULT_BOARD_SIZE; y++) {
        this._cell(x, y);
      }
    }
  }

  private _cell(x: number, y: number) {
    let cell = Globals.board.getCell(x, y);
    let positions = POSITIONS[cell.atoms];

    for (let index = 0; index < positions.length; index++) {
      const position = positions[index];
      let posX = position[0];
      let posY = position[1];
      let atomX = (x + posX) * CELL_SIZE_PX;
      let atomY = (y + posY) * CELL_SIZE_PX;
      this._atom(atomX, atomY);
    }
  }

  private _atom(x: number, y: number) {
    this._context.beginPath();

    this._context.moveTo(x + ATOM_RADIUS_PX, y);
    this._context.arc(x, y, ATOM_RADIUS_PX, 0, 2 * Math.PI, false);

    this._context.fillStyle = "blue";
    this._context.fill();
    this._context.stroke();
  }
}

export { Draw };
