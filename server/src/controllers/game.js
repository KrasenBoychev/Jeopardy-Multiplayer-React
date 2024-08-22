const { Router } = require('express');
const { v4 } = require('uuid');
const { StreamChat } = require('stream-chat');

const { api_key, api_secret } = require('../api-keys');

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

module.exports = { gameRouter };
