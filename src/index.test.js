const { controller } = require('./index');

let output = '';
beforeEach(() => {
  process.exit = jest.fn();
  process.stdout.write = jest.fn((str) => {
    output += str;
  });
  output = '';
});

afterAll(() => {
  process.stdin.destroy();
});

test('should produce correct output', () => {
  controller.executeCommand('C', ['5', '5']);
  expect(output).toBe(`-------
|     |
|     |
|     |
|     |
|     |
-------
`);
  output = '';
  controller.executeCommand('L', ['2', '2', '2', '5']);
  expect(output).toBe(`-------
|     |
| x   |
| x   |
| x   |
| x   |
-------
`);
  output = '';
  controller.executeCommand('R', ['1', '1', '3', '3']);
  expect(output).toBe(`-------
|xxx  |
|xxx  |
|xxx  |
| x   |
| x   |
-------
`);
  output = '';
  controller.executeCommand('B', ['4', '4', 'o']);
  expect(output).toBe(`-------
|xxxoo|
|xxxoo|
|xxxoo|
| xooo|
| xooo|
-------
`);
  output = '';
  controller.executeCommand('Q', []);
  expect(process.exit).toHaveBeenCalledTimes(1);
  expect(process.exit).toHaveBeenCalledWith();
});
