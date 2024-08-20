const { userRouter } = require('../controllers/user');

function configRoutes(app) {
  app.use('/users', userRouter);
}

module.exports = { configRoutes };