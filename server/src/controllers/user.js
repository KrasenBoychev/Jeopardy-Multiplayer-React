const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { StreamChat } = require('stream-chat');

const { login, register, getByUsername } = require('../services/user');
const { createToken } = require('../services/jwt');

const { isGuest } = require('../middlewares/guards');

const api_key = 'juudbb2ng7uh';
const api_secret =
  'zbyzqx223mj4az4hhdpkjs59n2hjtkkskn7nv7yev4b7jpv84k85bmz78bwa8cvx';
const serverClient = StreamChat.getInstance(api_key, api_secret);

const userRouter = Router();

userRouter.post('/login',
  isGuest(),
  body('email').trim(),
  body('password').trim(),
  async (req, res) => {
  try {
    const result = await login(req.body.email, req.body.password);
    const accessToken = createToken(result);

    const createGameToken = serverClient.createToken((result._id).toString());

    res.json({
      userId: result._id,
      email: result.email,
      username: result.username,
      accessToken,
      gameToken: createGameToken
    });
  } catch (err) {
      res.status(403).json({ code: 403, message: 'Incorrect email or password' });
  }
});

userRouter.post('/register', 
  isGuest(),
  body('email').trim().isEmail().withMessage('Please enter valid email'),
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').trim().isLength({ min: 3 }).withMessage('Password must be at least 3 characters'),
  async (req, res) => {
  try {
    const validation = validationResult(req);

    if (validation.errors.length) {
      throw validation.errors;
    }

    const result = await register(req.body.email, req.body.username, req.body.password);
    const accessToken = createToken(result);

    const createGameToken = serverClient.createToken(result._id);

    res.json({
      userId: result._id,
      email: result.email,
      username: result.username,
      accessToken,
      gameToken: createGameToken
    });
  
  } catch (err) {
      res.status(403).json({ code: 403, message: err.message });
  }
});

userRouter.get('/logout', (req, res) => {
  res.status(204).end();
});

// userRouter.get('/:id', async (req, res) => {
//   try {
//     const record = await getByUsername(req.params.id);
//     res.json(record);

//   } catch(err) {
//     res.status(404).json({ code: 404, message: 'User not found' });
//   }
// });

module.exports = { userRouter };
