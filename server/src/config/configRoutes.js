const { authRouter } = require('../controllers/auth');
const { userRouter } = require('../controllers/user');
const { gameRouter } = require('../controllers/game');
const { createRouter } = require('../controllers/create');
const { friendsRouter } = require('../controllers/friends');

function configRoutes(app) {
  app.use('/auth', authRouter)
  app.use('/users', userRouter);
  app.use('/play', gameRouter);
  app.use('/create', createRouter);
  app.use('/friends', friendsRouter);
}

module.exports = { configRoutes };