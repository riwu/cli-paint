const Controller = require('./index');
const Canvas = require('../models/Canvas');
const Line = require('../models/shapes/Line');
const Rectangle = require('../models/shapes/Rectangle');

jest.mock('../models/Canvas');

let controller;
beforeEach(() => {
  process.exit = jest.fn();
  controller = new Controller(new Canvas());
});

test('should fail if incorrect args length', () => {
  expect(() => controller.executeCommand('C', ['1', '1', '5'])).toThrow(
    'options specified should have a length of 2',
  );
  expect(() => controller.executeCommand('L', [])).toThrow(
    'options specified should have a length of 4',
  );
});

test('should fail if width or height not integer', () => {
  expect(() => controller.executeCommand('C', ['v', '1'])).toThrow('width should be an integer: v');
  expect(() => controller.executeCommand('C', ['1', '1o'])).toThrow(
    'height should be an integer: 1o',
  );
});

test('should fail if coordinates not integer', () => {
  expect(() => controller.executeCommand('L', ['v', '1', '1', '2'])).toThrow(
    'coordinate specified is not an integer: v',
  );
  expect(() => controller.executeCommand('R', ['2', '1', '1', '2a'])).toThrow(
    'coordinate specified is not an integer: 2a',
  );
  expect(() => controller.executeCommand('B', ['2', 'b', 'a'])).toThrow(
    'coordinate specified is not an integer: b',
  );
});

const testFnCallHelper = (command, commandArgs, functionName, count, ...fnArgs) => {
  controller.executeCommand(command, commandArgs);
  const { [functionName]: fn } = Canvas.mock.instances[Canvas.mock.instances.length - 1];
  expect(fn).toHaveBeenCalledTimes(count);
  expect(fn).toHaveBeenCalledWith(...fnArgs);
};

test('should allow multiple initialisation', () => {
  testFnCallHelper('C', ['5', '10'], 'initialise', 1, 5, 10);
  testFnCallHelper('C', ['3', '3'], 'initialise', 2, 3, 3);
});

test('should add line', () => {
  testFnCallHelper('L', ['2', '3', '2', '4'], 'add', 1, new Line(1, 2, 1, 3));
});

test('should add rectangle', () => {
  testFnCallHelper('R', ['2', '3', '6', '8'], 'add', 1, new Rectangle(1, 2, 5, 7));
});

test('should fill symbol', () => {
  testFnCallHelper('B', ['2', '3', 'o'], 'fill', 1, 1, 2, 'o');
});

test('should quit', () => {
  controller.executeCommand('Q', []);
  expect(process.exit).toHaveBeenCalledTimes(1);
  expect(process.exit).toHaveBeenCalledWith();
});

test('should allow lowercase', () => {
  controller.executeCommand('q', []);
  expect(process.exit).toHaveBeenCalledTimes(1);
  expect(process.exit).toHaveBeenCalledWith();
});

test('should error if invalid command', () => {
  ['A', 'QQ'].forEach((command) => {
    expect(() => controller.executeCommand(command, [])).toThrow(`unknown command: ${command}`);
  });
});
