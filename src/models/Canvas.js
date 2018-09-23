const createMatrix = require('../util/createMatrix');

module.exports = class Canvas {
  constructor() {
    this.listeners = new Set();
  }

  addListener(listener) {
    this.listeners.add(listener);
  }

  updateListeners() {
    this.listeners.forEach(listener => listener.renderMatrix(this.matrix));
  }

  checkValid(width, height) {
    if (width <= 0 || height <= 0) {
      throw Error(`${width <= 0 ? 'width' : 'height'} should be larger than 0`);
    }
  }

  initialise(width, height) {
    this.checkValid(width, height);
    this.matrix = createMatrix(width, height);
    this.updateListeners(this.matrix);
  }

  checkInitialised() {
    if (!this.matrix) {
      throw Error('please create a canvas first with command C');
    }
  }

  checkTargetValid(x, y) {
    if (x < 0 || y < 0) {
      throw Error('Coordinates specified should be greater than 0');
    }
    if (y >= this.matrix.length || x >= this.matrix[y].length) {
      throw Error(
        `Coordinates specified lies outside the canvas with width ${
          this.matrix[0].length
        } and height ${this.matrix.length}`,
      );
    }
  }

  add(shape) {
    this.checkInitialised();

    const toFill = [];
    // polymorphism if this is in Java
    shape.fill((x, y) => {
      this.checkTargetValid(x, y);
      toFill.push([x, y]); // avoid mutating matrix until all checkFillValid passed
    });
    toFill.forEach(([x, y]) => {
      this.matrix[y][x] = true;
    });
    this.updateListeners(this.matrix);
  }

  checkSymbolValid(symbol) {
    if (symbol.length !== 1) {
      throw Error(`colour specified (${symbol}) is not single letter`);
    }
  }

  checkTargetOccupied(x, y) {
    if (this.matrix[y][x] === true) {
      throw Error('Target coordinate is occupied by a shape bounds');
    }
  }

  // Depth-first search from (targetX, targetY)
  fill(targetX, targetY, symbol) {
    this.checkInitialised();
    this.checkSymbolValid(symbol);
    this.checkTargetValid(targetX, targetY);
    this.checkTargetOccupied(targetX, targetY);
    const height = this.matrix.length;
    const width = this.matrix[0].length;
    const visited = createMatrix(width, height);
    const stack = [[targetX, targetY]];
    while (stack.length) {
      const [x, y] = stack.pop();
      if (visited[y][x]) continue;
      visited[y][x] = true;

      if (this.matrix[y][x] === true) continue; // skip if position not empty
      this.matrix[y][x] = symbol;

      // add neighbours to stack
      if (x > 0) stack.push([x - 1, y]);
      if (x < width - 1) stack.push([x + 1, y]);
      if (y > 0) stack.push([x, y - 1]);
      if (y < height - 1) stack.push([x, y + 1]);
    }
    this.updateListeners(this.matrix);
  }
};
