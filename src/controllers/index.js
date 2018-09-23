const Line = require('../models/shapes/Line');
const Rectangle = require('../models/shapes/Rectangle');

const mapToNumber = args => args.map(arg => Number(arg));

module.exports = class Controller {
  constructor(canvas) {
    this.canvas = canvas;
  }

  checkArgsLength(args, len) {
    if (args.length !== len) {
      throw Error(`options specified should have a length of ${len}`);
    }
  }

  executeCommand(command, args) {
    switch (command) {
      case 'C':
        this.checkArgsLength(args, 2);
        this.canvas.initialise(...mapToNumber(args));
        break;
      case 'L':
        this.checkArgsLength(args, 4);
        this.canvas.add(new Line(...mapToNumber(args)));
        break;
      case 'R':
        this.checkArgsLength(args, 4);
        this.canvas.add(new Rectangle(...mapToNumber(args)));
        break;
      case 'B':
        this.checkArgsLength(args, 3);
        this.canvas.fill(...mapToNumber(args.slice(0, 2)), args[2]);
        break;
      case 'Q':
        this.checkArgsLength(args, 0);
        process.exit();
        break;
      default:
        throw Error(`Unknown command: ${command}`);
    }
  }
};
