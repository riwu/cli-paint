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
    'Options specified should have a length of 2',
  );
  expect(() => controller.executeCommand('L', [])).toThrow(
    'Options specified should have a length of 4',
  );
});

const testFnCallHelper = (command, commandArgs, functionName, ...fnArgs) => {
  controller.executeCommand(command, commandArgs);
  const { [functionName]: fn } = Canvas.mock.instances[Canvas.mock.instances.length - 1];
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenCalledWith(...fnArgs);
};

test('should initialise', () => {
  testFnCallHelper('C', ['5', '10'], 'initialise', 5, 10);
});

test('should add line', () => {
  testFnCallHelper('L', ['1', '2', '1', '3'], 'add', new Line(1, 2, 1, 3));
});

test('should add rectangle', () => {
  testFnCallHelper('R', ['1', '2', '5', '7'], 'add', new Rectangle(1, 2, 5, 7));
});

test('should fill symbol', () => {
  testFnCallHelper('B', ['1', '2', 'o'], 'fill', 1, 2, 'o');
});

test('should quit', () => {
  controller.executeCommand('Q', []);
  expect(process.exit).toHaveBeenCalledTimes(1);
  expect(process.exit).toHaveBeenCalledWith();
});

test('should error if invalid command', () => {
  ['', ' Q', 'A', 'q', 'QQ'].forEach((command) => {
    expect(() => controller.executeCommand(command, [])).toThrow(`Unknown command: ${command}`);
  });
});
