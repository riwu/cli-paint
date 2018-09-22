const Canvas = require('./models/Canvas');
const View = require('./View');
const Controller = require('./Controller');

const canvas = new Canvas();
const controller = new Controller(canvas);
const view = new View(controller);
canvas.addListener(view);
