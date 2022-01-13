export class Circular<T> {
  readonly values: T[];
  currentIndex: number;

  constructor(arr: T[], startIndex = 0) {
    this.values = arr;
    this.currentIndex = startIndex;
  }

  next() {
    const currentIndex = this.currentIndex;
    const totalLength = this.values.length;

    const overLimit = currentIndex + 1 > totalLength - 1;
    this.currentIndex = overLimit ? 0 : currentIndex + 1;
  }

  current() {
    return this.values[this.currentIndex];
  }

  previous() {
    const initialPosition = this.currentIndex === 0;
    const totalLength = this.values.length;

    this.currentIndex = initialPosition
      ? totalLength - 1
      : this.currentIndex - 1;
  }
}
