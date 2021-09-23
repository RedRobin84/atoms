import { GameSettings } from "./gameSettings.js";

const DEFAULT_VALUE = 0;

var Board = [];

for (let row = 0; row < GameSettings.DEFAULT_BOARD_SIZE; row++) {
  Board.push([]);
  for (let col = 0; col < GameSettings.DEFAULT_BOARD_SIZE; col++) {
    Board[row].push(DEFAULT_VALUE);
  }
}

export { Board };
