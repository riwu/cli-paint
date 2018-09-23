module.exports = class Rectangle {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.checkValid();
  }

  checkValid() {
    [this.x1, this.y1, this.x2, this.y2].forEach((v) => {
      if (!Number.isInteger(v)) {
        throw Error(`Coordinate specified is not an integer: ${v}`);
      }
    });
    if (this.x1 > this.x2 || this.y1 > this.y2) {
      const axis = this.x1 > this.x2 ? 'x' : 'y';
      throw Error(`${axis}1 should not be larger than ${axis}2`);
    }
  }

  fill(fillMatrix) {
    [this.y1, this.y2].forEach((y) => {
      for (let x = this.x1; x <= this.x2; x++) {
        fillMatrix(x, y);
      }
    });

    [this.x1, this.x2].forEach((x) => {
      for (let y = this.y1; y <= this.y2; y++) {
        fillMatrix(x, y);
      }
    });
  }
};
