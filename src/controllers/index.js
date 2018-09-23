const Line = require('../models/shapes/Line');
const Rectangle = require('../models/shapes/Rectangle');

const mapToNumber = args => args.map(arg => Number(arg));
const mapToIndex = args => mapToNumber(args).map(arg => arg - 1); // array index starts at 0

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
        this.canvas.add(new Line(...mapToIndex(args)));
        break;
      case 'R':
        this.checkArgsLength(args, 4);
        this.canvas.add(new Rectangle(...mapToIndex(args)));
        break;
      case 'B':
        this.checkArgsLength(args, 3);
        this.canvas.fill(...mapToIndex(args.slice(0, 2)), args[2]);
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
