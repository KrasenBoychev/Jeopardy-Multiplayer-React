const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { login, register, getTopPlayers } = require('../services/user');
const { createToken } = require('../services/jwt');

const { isGuest } = require('../middlewares/guards');
const { parseError } = require('../util');

const userRouter = Router();

userRouter.post('/login',
  isGuest(),
  body('email').trim(),
  body('password').trim(),
  async (req, res) => {
  try {
    const result = await login(req.body.email, req.body.password);

    const accessToken = createToken(result);
    
    res.json({
      userId: result._id,
      email: result.email,
      username: result.username,
      points: result.points,
      accessToken
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

    res.json({
      userId: result._id,
      email: result.email,
      username: result.username,
      points: result.points,
      accessToken
    });
  
  } catch (err) {
      res.status(403).json({ code: 403, message: err.message });
  }
});

userRouter.get('/logout', (req, res) => {
  res.status(204).end();
});

userRouter.get('/topPlayers', async (req, res) => {
  try {
    const data = await getTopPlayers();
    res.json(data);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

module.exports = { userRouter };
