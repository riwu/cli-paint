const Line = require('./Line');
const createMatrix = require('../../util/createMatrix');

test('should initialise correctly', () => {
  [[5, 1, 5, 13], [5, 1, 6, 1]].forEach((coordinates) => {
    const line = new Line(...coordinates);
    expect([line.x1, line.y1, line.x2, line.y2]).toEqual(coordinates);
  });
});

test('should error if not valid line', () => {
  expect(() => new Line(5, 1, 2, 3)).toThrow('x1 should not be larger than x2');
  expect(() => new Line(5, 5, 8, 3)).toThrow('y1 should not be larger than y2');
  expect(() => new Line(1, 2, 3, 4)).toThrow('either y1 and y2, or x1 and x2 should be the same');
  expect(() => new Line('1', '2', '1', '5')).toThrow('Coordinate specified is not an integer: 1');
});

test('should fill matrix', () => {
  const matrix = createMatrix(5, 5);

  new Line(0, 1, 0, 3).fill((x, y) => {
    matrix[y][x] = true;
  });
  expect(matrix).toEqual([
    [false, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [false, false, false, false, false],
  ]);

  new Line(0, 2, 4, 2).fill((x, y) => {
    matrix[y][x] = true;
  });
  expect(matrix).toEqual([
    [false, false, false, false, false],
    [true, false, false, false, false],
    [true, true, true, true, true],
    [true, false, false, false, false],
    [false, false, false, false, false],
  ]);
});
