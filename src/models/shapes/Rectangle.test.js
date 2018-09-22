const Rectangle = require('./Rectangle');
const createMatrix = require('../../util/createMatrix');

test('fill matrix', () => {
  const matrix = createMatrix(5, 5);
  new Rectangle(0, 1, 2, 3).fill(matrix);
  expect(matrix).toEqual([
    [false, false, false, false, false],
    [true, true, true, false, false],
    [true, false, true, false, false],
    [true, true, true, false, false],
    [false, false, false, false, false],
  ]);
});
