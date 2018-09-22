const Rectangle = require('./Rectangle');

// a Line is essentially a Rectangle with x1 === x2 || y1 === y2
module.exports = class Line extends Rectangle {};
