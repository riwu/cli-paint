const Rectangle = require('./Rectangle');

// a Line is essentially a Rectangle with x1 === x2 || y1 === y2
module.exports = class Line extends Rectangle {
  checkValid() {
    super.checkValid();
    if (this.x1 !== this.x2 && this.y1 !== this.y2) {
      throw Error('either y1 and y2, or x1 and x2 should be the same');
    }
  }
};
