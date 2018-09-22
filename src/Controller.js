const Line = require('./models/shapes/Line');
const Rectangle = require('./models/shapes/Rectangle');

const mapToNumber = args => args.map(arg => Number(arg));

module.exports = class Controller {
  constructor(canvas) {
    this.canvas = canvas;
  }

  executeCommand(command, args) {
    switch (command) {
      case 'C':
        this.canvas.initialise(...mapToNumber(args));
        break;
      case 'L':
        this.canvas.add(new Line(...mapToNumber(args)));
        break;
      case 'R':
        this.canvas.add(new Rectangle(...mapToNumber(args)));
        break;
      case 'B':
        this.canvas.fill(...mapToNumber(args.slice(0, 2)), args[2]);
        break;
      case 'Q':
        process.exit();
        break;
      default:
        throw Error(`Unknown command: ${command}`);
    }
  }
};
