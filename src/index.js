const Canvas = require('./models/Canvas');
const View = require('./views');
const Controller = require('./controllers');

const canvas = new Canvas();
const controller = new Controller(canvas);
const view = new View(controller);
canvas.addListener(view);

module.exports = {
  canvas,
  view,
  controller,
};
