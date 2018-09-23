const View = require('./index');

let view;
let output = '';
beforeEach(() => {
  process.stdout.write = jest.fn((str) => {
    output += str;
  });
  output = '';
  view = new View();
});

afterAll(() => {
  view.close();
});

test('should prompt for command', () => {
  expect(output).toBe('enter command: ');
});

describe('test rendering', () => {
  test('should render empty matrix', () => {
    view.renderMatrix([[false, false], [false, false], [false, false]]);
    expect(output).toBe(
      `enter command: ----
|  |
|  |
|  |
----
`,
    );
  });

  test('should render line', () => {
    view.renderMatrix([
      [false, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
    ]);
    expect(output).toBe(
      `enter command: -------
|     |
|x    |
|x    |
|x    |
-------
`,
    );
  });

  test('should render rectangle', () => {
    view.renderMatrix([
      [false, false, false, false, false],
      [true, true, true, false, false],
      [true, false, true, false, false],
      [true, true, true, false, false],
      [false, false, false, false, false],
    ]);
    expect(output).toBe(
      `enter command: -------
|     |
|xxx  |
|x x  |
|xxx  |
|     |
-------
`,
    );
  });

  test('should render both rectangle and line', () => {
    view.renderMatrix([
      [false, true, false, false, false],
      [true, true, true, false, false],
      [true, true, true, false, false],
      [true, true, true, false, false],
      [false, true, false, false, false],
    ]);
    expect(output).toBe(
      `enter command: -------
| x   |
|xxx  |
|xxx  |
|xxx  |
| x   |
-------
`,
    );
  });

  test('should render symbols', () => {
    view.renderMatrix([
      ['o', 'o', 'o', 'o', 'o'],
      [true, true, true, 'o', 'o'],
      [true, 'y', true, 'o', 'o'],
      [true, true, true, 'o', 'o'],
    ]);
    expect(output).toBe(
      `enter command: -------
|ooooo|
|xxxoo|
|xyxoo|
|xxxoo|
-------
`,
    );
  });
});
