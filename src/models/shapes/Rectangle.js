module.exports = class Rectangle {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  fill(matrix) {
    [this.y1, this.y2].forEach((y) => {
      for (let x = this.x1; x <= this.x2; x++) {
        matrix[y][x] = true;
      }
    });

    [this.x1, this.x2].forEach((x) => {
      for (let y = this.y1; y <= this.y2; y++) {
        matrix[y][x] = true;
      }
    });
  }
};
