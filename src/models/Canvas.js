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

  initialise(width, height) {
    this.matrix = createMatrix(width, height);
    this.updateListeners(this.matrix);
  }

  add(shape) {
    // polymorphism if this is in Java
    shape.fill((x, y) => {
      this.matrix[y][x] = true;
    });
    this.updateListeners(this.matrix);
  }

  // Depth-first search
  fill(targetX, targetY, symbol) {
    const height = this.matrix.length;
    const width = this.matrix[0].length;
    const visited = createMatrix(width, height);
    const stack = [[targetX, targetY]];
    while (stack.length) {
      const [x, y] = stack.pop();
      if (visited[y][x]) continue;
      visited[y][x] = true;

      if (this.matrix[y][x]) continue;
      this.matrix[y][x] = symbol;

      if (x > 0) stack.push([x - 1, y]);
      if (x < width - 1) stack.push([x + 1, y]);
      if (y > 0) stack.push([x, y - 1]);
      if (y < height - 1) stack.push([x, y + 1]);
    }
    this.updateListeners(this.matrix);
  }
};
