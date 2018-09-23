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
    if (!Number.isInteger(width)) {
      throw Error(`width should be an integer: ${width}`);
    }
    if (!Number.isInteger(height)) {
      throw Error(`height should be an integer: ${height}`);
    }
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

  add(shape) {
    this.checkInitialised();
    // polymorphism if this is in Java
    shape.fill((x, y) => {
      this.matrix[y][x] = true;
    });
    this.updateListeners(this.matrix);
  }

  checkSymbolValid(symbol) {
    if (symbol.length !== 1) {
      throw Error(`colour specified is not single letter: ${symbol}`);
    }
  }

  // Depth-first search from (targetX, targetY)
  fill(targetX, targetY, symbol) {
    this.checkInitialised();
    this.checkSymbolValid(symbol);
    const height = this.matrix.length;
    const width = this.matrix[0].length;
    const visited = createMatrix(width, height);
    const stack = [[targetX, targetY]];
    while (stack.length) {
      const [x, y] = stack.pop();
      if (visited[y][x]) continue;
      visited[y][x] = true;

      if (this.matrix[y][x]) continue; // skip if position not empty
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
