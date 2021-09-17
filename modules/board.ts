import { GameSettings } from "./gameSettings.js";
import { Cell } from "./cell.js";
import { Log } from "./log.js";

const DEFAULT_ATOM_COUNT = 0;

class Board {
  private _data: Cell[][];

  constructor() {
    this._data = new Array<Array<Cell>>();
    Log.debug("Board: constructiong new board...");
    for (let row = 0; row < GameSettings.DEFAULT_BOARD_SIZE; row++) {
      this._data.push(new Array<Cell>());
      for (let col = 0; col < GameSettings.DEFAULT_BOARD_SIZE; col++) {
        this._data[row].push(
          new Cell(this.getLimit(row, col), DEFAULT_ATOM_COUNT)
        );
      }
    }
  }

  public getCell(x: number, y: number) {
    return this._data[x][y];
  }

  /**
   * addAtom - raises atom counter for specified cell. If the counter is higher than
   * limit, distribute one atom to each vertical / horizontal neighbour cell.
   */
  public addAtom(x: number, y: number) {
    Log.debug(`Board::addAtom: x=${x}, y=${y}`);
    let cell = this._data[x][y];
    cell.atoms++;

    if (cell.atoms > cell.limit) {
      let neighbours = this.getNeighboursCoordinates(x, y);
      Log.debug(`Board::addAtom: neighbours: ${neighbours}`);
      cell.atoms -= neighbours.length;

      for (let index = 0; index < neighbours.length; index++) {
        let n = neighbours[index];
        this.addAtom(n[0], n[1]);
      }
    }
  }
  
  private getNeighboursCoordinates(x: number, y: number) {
    var neighboursCoordinates = [];
    if (x > 0) {
      neighboursCoordinates.push([x - 1, y]);
    }
    if (x + 1 < GameSettings.DEFAULT_BOARD_SIZE) {
      neighboursCoordinates.push([x + 1, y]);
    }
    if (y > 0) {
      neighboursCoordinates.push([x, y - 1]);
    }
    if (y + 1 < GameSettings.DEFAULT_BOARD_SIZE) {
      neighboursCoordinates.push([x, y + 1]);
    }
    return neighboursCoordinates;
  }

  private getLimit(x: number, y: number) {
    let limit = 4;
    if (x == 0 || x + 1 == GameSettings.DEFAULT_BOARD_SIZE) {
      limit--;
    }
    if (y == 0 || y + 1 == GameSettings.DEFAULT_BOARD_SIZE) {
      limit--;
    }
    return limit;
  }
}

export { Board };
