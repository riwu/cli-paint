const createMatrix = require('./createMatrix');

test('should create matrix', () => {
  expect(createMatrix(2, 3)).toEqual([[false, false], [false, false], [false, false]]);
});
