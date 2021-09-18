export class Log {
  static _debug = false;

  static debug(message: string) {
    if (this.debug) {
      console.log(message);
    }
  }
}
