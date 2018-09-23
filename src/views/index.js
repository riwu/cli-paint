const readline = require('readline');
const os = require('os');

const LINE_CHARACTER = 'x';
const UNFILLED_CHARACTER = ' ';
const HORIZONTAL_BOUND_CHARACTER = '-';
const VERTICAL_BOUND_CHARACTER = '|';

module.exports = class View {
  constructor(controller) {
    const rl = readline.createInterface({
      input: process.stdin,
    });

    const promptForCommand = () => process.stdout.write('enter command: ');
    promptForCommand();
    rl.on('line', (input) => {
      const inputArr = input.trim().split(' ');
      const command = inputArr[0];
      const args = inputArr.slice(1);
      try {
        controller.executeCommand(command, args);
      } catch (e) {
        process.stdout.write(`Error: ${e.message}${os.EOL}`);
      }
      promptForCommand();
    });
  }

  renderMatrix(matrix) {
    const drawHorizontalBound = () => process.stdout.write(HORIZONTAL_BOUND_CHARACTER.repeat(matrix[0].length + 2) + os.EOL);
    drawHorizontalBound();
    for (let row = 0; row < matrix.length; row++) {
      process.stdout.write(VERTICAL_BOUND_CHARACTER);
      for (let col = 0; col < matrix[0].length; col++) {
        process.stdout.write(
          matrix[row][col] === true ? LINE_CHARACTER : matrix[row][col] || UNFILLED_CHARACTER,
        );
      }
      process.stdout.write(VERTICAL_BOUND_CHARACTER + os.EOL);
    }
    drawHorizontalBound();
  }
};
