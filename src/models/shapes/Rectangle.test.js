const Rectangle = require('./Rectangle');
const createMatrix = require('../../util/createMatrix');

test('should initialise correctly', () => {
  const coordinates = [5, 1, 12, 13];
  const rect = new Rectangle(...coordinates);
  expect([rect.x1, rect.y1, rect.x2, rect.y2]).toEqual(coordinates);
});

test('should error if not valid rectangle', () => {
  expect(() => new Rectangle(5, 1, 2, 3)).toThrow('x1 should not be larger than x2');
  expect(() => new Rectangle(5, 5, 8, 3)).toThrow('y1 should not be larger than y2');
  expect(() => new Rectangle('1', '2', '4', '5')).toThrow(
    'Coordinate specified is not an integer: 1',
  );
});

test('should fill matrix', () => {
  const matrix = createMatrix(5, 5);

  new Rectangle(0, 1, 2, 3).fill((x, y) => {
    matrix[y][x] = true;
  });
  expect(matrix).toEqual([
    [false, false, false, false, false],
    [true, true, true, false, false],
    [true, false, true, false, false],
    [true, true, true, false, false],
    [false, false, false, false, false],
  ]);

  new Rectangle(1, 0, 1, 4).fill((x, y) => {
    matrix[y][x] = true;
  });
  expect(matrix).toEqual([
    [false, true, false, false, false],
    [true, true, true, false, false],
    [true, true, true, false, false],
    [true, true, true, false, false],
    [false, true, false, false, false],
  ]);
});
