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

test('should fail initialise if width or height is <= 0', () => {
  expect(() => canvas.initialise(-1, 3)).toThrow('width should be larger than 0');
  expect(() => canvas.initialise(1, 0)).toThrow('height should be larger than 0');
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

test('should allow fill override', () => {
  canvas.initialise(4, 4);
  canvas.add(new Rectangle(0, 0, 2, 2));
  canvas.fill(3, 3, 'o');
  canvas.fill(3, 3, 'v');
  expect(canvas.matrix).toEqual([
    [true, true, true, 'v'],
    [true, false, true, 'v'],
    [true, true, true, 'v'],
    ['v', 'v', 'v', 'v'],
  ]);

  canvas.fill(1, 1, 'z');
  canvas.fill(1, 1, 'q');
  expect(canvas.matrix).toEqual([
    [true, true, true, 'v'],
    [true, 'q', true, 'v'],
    [true, true, true, 'v'],
    ['v', 'v', 'v', 'v'],
  ]);
});

test('should allow fill with x', () => {
  canvas.initialise(5, 5);
  canvas.add(new Rectangle(0, 0, 3, 3));
  canvas.fill(1, 1, 'x');
  expect(canvas.matrix).toEqual([
    [true, true, true, true, false],
    [true, 'x', 'x', true, false],
    [true, 'x', 'x', true, false],
    [true, true, true, true, false],
    [false, false, false, false, false],
  ]);

  canvas.fill(1, 1, 'o');
  expect(canvas.matrix).toEqual([
    [true, true, true, true, false],
    [true, 'o', 'o', true, false],
    [true, 'o', 'o', true, false],
    [true, true, true, true, false],
    [false, false, false, false, false],
  ]);
});

test('should fail if fill symbol invalid', () => {
  canvas.initialise(4, 4);
  expect(() => canvas.fill(3, 3, 'oo')).toThrow('colour specified (oo) is not single letter');
});

test('should fail if fill target occupied', () => {
  canvas.initialise(4, 4);
  canvas.add(new Rectangle(0, 0, 1, 1));
  expect(() => canvas.fill(1, 1, 'o')).toThrow('Target coordinate is occupied by a shape bounds');
});

test('should fail if add or fill before initialise', () => {
  expect(() => canvas.add(new Rectangle(0, 0, 2, 2))).toThrow(
    'please create a canvas first with command C',
  );
  expect(() => canvas.fill(1, 1, 'o')).toThrow('please create a canvas first with command C');
});

test('should fail if drawing out of bounds', () => {
  canvas.initialise(2, 2);

  const outOfBounds = 'Coordinates specified lies outside the canvas with width 2 and height 2';
  const greaterThan0 = 'Coordinates specified should be greater than 0';
  expect(() => canvas.add(new Line(1, 1, 1, 2))).toThrow(outOfBounds);
  expect(() => canvas.add(new Rectangle(0, 0, 2, 1))).toThrow(outOfBounds);
  expect(() => canvas.add(new Line(1, -1, 1, 1))).toThrow(greaterThan0);
  expect(() => canvas.add(new Rectangle(-1, 1, 1, 1))).toThrow(greaterThan0);
  expect(() => canvas.fill(-1, 1, 'o')).toThrow(greaterThan0);
  expect(() => canvas.fill(0, 2, 'o')).toThrow(outOfBounds);

  expect(canvas.matrix).toEqual([[false, false], [false, false]]);
});
