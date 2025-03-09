const { Router } = require('express');
const { parseError } = require('../util');
const {
  getTopPlayers,
  getPlayerPoints,
} = require('../services/user');

const userRouter = Router();

userRouter.get('/topPlayers', async (req, res) => {
  try {
    const data = await getTopPlayers();
    res.json(data);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

userRouter.get('/playerPoints/:userId', async (req, res) => {
  try {
    const data = await getPlayerPoints(req.params.userId);
    res.json(data);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

module.exports = { userRouter };
