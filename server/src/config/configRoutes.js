const { userRouter } = require('../controllers/user');
const { gameRouter } = require('../controllers/game');
const { createRouter } = require('../controllers/create');

function configRoutes(app) {
  app.use('/users', userRouter);
  app.use('/play', gameRouter);
  app.use('/create', createRouter);
}

module.exports = { configRoutes };