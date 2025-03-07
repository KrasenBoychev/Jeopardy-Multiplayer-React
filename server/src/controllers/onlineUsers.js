const { Router } = require('express');
const { parseError } = require('../util');
const { addNewOnlineUser } = require('../services/onlineUsers');

const onlineUsersRouter = Router();

onlineUsersRouter.get('/addNewUser', async (req, res) => {
  try {
    await addNewOnlineUser();
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

module.exports = { onlineUsersRouter };
