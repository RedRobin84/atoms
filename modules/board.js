const MATRIX_SIZE = 6;
const DEFAULT_VALUE = 0;

var Board = [];

for (let row = 0; row < MATRIX_SIZE; row++) {
  Board.push([]);
  for (let col = 0; col < MATRIX_SIZE; col++) {
    Board[row].push(DEFAULT_VALUE);
  }
}

export { Board };
