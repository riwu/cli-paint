const Canvas = require('./Canvas');
const View = require('../views');
const Line = require('../models/shapes/Line');
const Rectangle = require('../models/shapes/Rectangle');

jest.mock('../views');

let canvas;
beforeEach(() => {
  canvas = new Canvas();
  canvas.addListener(new View());
});

const testListenerCalled = (matrix, count = 1) => {
  const { renderMatrix } = View.mock.instances[View.mock.instances.length - 1];
  expect(renderMatrix).toHaveBeenCalledTimes(count);
  expect(renderMatrix).toHaveBeenCalledWith(matrix);
};

test('should allow multiple initialisation', () => {
  canvas.initialise(3, 3);
  expect(canvas.matrix).toEqual([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);
  testListenerCalled(canvas.matrix);
  canvas.initialise(1, 2);
  expect(canvas.matrix).toEqual([[false], [false]]);
  testListenerCalled(canvas.matrix, 2);
});

test('should reset matrix on initialisation', () => {
  canvas.initialise(2, 2);
  canvas.add(new Line(1, 0, 1, 1));
  canvas.initialise(3, 3);
  expect(canvas.matrix).toEqual([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);
  testListenerCalled(canvas.matrix, 3);
});

test('should fail initialise if width or height is invalid', () => {
  expect(() => canvas.initialise(-1, 3)).toThrow('width should be larger than 0');
  expect(() => canvas.initialise(1, 0)).toThrow('height should be larger than 0');
  expect(() => canvas.initialise('2', 3)).toThrow('width should be an integer: 2');
  expect(() => canvas.initialise(2, '3')).toThrow('height should be an integer: 3');
});

test('should add correctly', () => {
  canvas.initialise(4, 4);
  canvas.add(new Line(1, 1, 1, 3));
  expect(canvas.matrix).toEqual([
    [false, false, false, false],
    [false, true, false, false],
    [false, true, false, false],
    [false, true, false, false],
  ]);
  testListenerCalled(canvas.matrix, 2);

  canvas.add(new Rectangle(0, 1, 1, 2));
  expect(canvas.matrix).toEqual([
    [false, false, false, false],
    [true, true, false, false],
    [true, true, false, false],
    [false, true, false, false],
  ]);
  testListenerCalled(canvas.matrix, 3);
});

test('should fill correctly', () => {
  canvas.initialise(4, 4);
  canvas.add(new Rectangle(0, 0, 2, 2));
  canvas.fill(3, 3, 'o');
  expect(canvas.matrix).toEqual([
    [true, true, true, 'o'],
    [true, false, true, 'o'],
    [true, true, true, 'o'],
    ['o', 'o', 'o', 'o'],
  ]);
  testListenerCalled(canvas.matrix, 3);

  canvas.fill(1, 1, 'n');
  expect(canvas.matrix).toEqual([
    [true, true, true, 'o'],
    [true, 'n', true, 'o'],
    [true, true, true, 'o'],
    ['o', 'o', 'o', 'o'],
  ]);
  testListenerCalled(canvas.matrix, 4);
});

test('should fail if fill symbol invalid', () => {
  canvas.initialise(4, 4);
  expect(() => canvas.fill(3, 3, 'oo')).toThrow('colour specified is not single letter: oo');
});

test('should fail if add or fill before initialise', () => {
  expect(() => canvas.add(new Rectangle(0, 0, 2, 2))).toThrow(
    'please create a canvas first with command C',
  );
  expect(() => canvas.fill(1, 1, 'o')).toThrow('please create a canvas first with command C');
});

test('should fail if coordinate out of bounds', () => {
  canvas.initialise(1, 1);
  expect(() => canvas.add(new Line(0, 1, 0, 1))).toThrow(
    'please create a canvas first with command C',
  );
});
