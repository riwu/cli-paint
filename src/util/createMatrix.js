const createMatrix = (width, height) => [...Array(Number(height))].map(() => Array(Number(width)));

module.exports = createMatrix;
