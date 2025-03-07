const { userRouter } = require('../controllers/user');
const { gameRouter } = require('../controllers/game');
const { createRouter } = require('../controllers/create');
const { onlineUsersRouter } = require('../controllers/onlineUsers');

function configRoutes(app) {
  app.use('/users', userRouter);
  app.use('/play', gameRouter);
  app.use('/create', createRouter);
  app.use('/onlineUsers', onlineUsersRouter);
}

module.exports = { configRoutes };