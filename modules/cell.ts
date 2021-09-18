export class Cell {
  readonly limit: number;
  atoms: number;

  constructor(limit: number, atoms: number) {
    this.limit = limit;
    this.atoms = atoms;
  }
}
