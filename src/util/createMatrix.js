const createArray = size => [...Array(Number(size))];
const createMatrix = (width, height) => createArray(height).map(() => createArray(width).map(() => false));

module.exports = createMatrix;
