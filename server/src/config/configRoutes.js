const { gameRouter } = require('../controllers/game');
const { userRouter } = require('../controllers/user');

function configRoutes(app) {
  app.use('/users', userRouter);
  app.use('/play', gameRouter);
}

module.exports = { configRoutes };