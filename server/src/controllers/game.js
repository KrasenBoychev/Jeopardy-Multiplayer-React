const { Router } = require('express');
const { v4 } = require('uuid');
const { StreamChat } = require('stream-chat');

const { api_key, api_secret } = require('../api-keys');

const { parseError } = require('../util');

const { getAllCategories, getCategory } = require('../services/game');

const gameRouter = Router();

gameRouter.get('/:username', async (req, res) => {
  const serverClient = StreamChat.getInstance(api_key, api_secret);

  try {
    const username = req.params.username;

    const { users } = await serverClient.queryUsers({ name: username });

    let token;
    let userIdResult;

    if (users.length === 0) {
      const userId = v4();
      token = serverClient.createToken(userId);
      userIdResult = userId;
    } else {
      token = serverClient.createToken(users[0].id);
      userIdResult = users[0].id;
    }

    res.json({
      token,
      userId: userIdResult,
    });
  } catch (error) {
    res.json(error);
  }
});

gameRouter.get('/categories/all', async (req, res) => {
  try {
    const data = await getAllCategories();
    res.json(data);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

gameRouter.get('/category/:categoryName', async (req, res) => {
  try {
    const data = await getCategory(req.params.categoryName);
    res.json(data);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

module.exports = { gameRouter };
