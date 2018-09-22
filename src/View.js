const readline = require('readline');

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
      const inputArr = input.split(' ');
      const command = inputArr[0];
      const args = inputArr.slice(1);
      controller.executeCommand(command, args);
      promptForCommand();
    });
  }

  renderMatrix(matrix) {
    const drawHorizontalBound = () => console.log(HORIZONTAL_BOUND_CHARACTER.repeat(matrix[0].length + 2));
    drawHorizontalBound();
    for (let row = 0; row < matrix.length; row++) {
      process.stdout.write(VERTICAL_BOUND_CHARACTER);
      for (let col = 0; col < matrix[0].length; col++) {
        process.stdout.write(
          matrix[row][col] === true ? LINE_CHARACTER : matrix[row][col] || UNFILLED_CHARACTER,
        );
      }
      console.log(VERTICAL_BOUND_CHARACTER);
    }
    drawHorizontalBound();
  }
};
