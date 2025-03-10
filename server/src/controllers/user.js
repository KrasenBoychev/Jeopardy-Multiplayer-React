const { Router } = require('express');
const { parseError } = require('../util');
const {
  getTopPlayers,
  getPlayerPoints,
  getUserByUsername,
} = require('../services/user');
const { checkIfUserIsOnline } = require('../services/onlineUsers');

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

userRouter.get('/checkUser/:username', async (req, res) => {
  try {
    const result = {status: '', msg: ''};

    const friendUsername = req.params.username;
    const userUsername = req.user.username;

    const user = await getUserByUsername(friendUsername);

    if (user.length > 0) {
      const friend = user[0];

      if (friend.friendRequests.includes(userUsername)) {
        result.status = 'error';
        result.msg = 'Invitation has already been sent to ' + friendUsername;

      } else {
        const userOnline = await checkIfUserIsOnline(friendUsername);

        if (userOnline) {
          result.status = 'send invitation';
          result.friendDetails = userOnline.onlineUsers[0];
        } else {
          result.status = 'success';
        }

        result.msg = 'Invitation sent to ' + friendUsername;
        
        friend.friendRequests.push(userUsername);
        await friend.save();
        
      }
    } else {
      result.status = 'error';
      result.msg = friendUsername + ' does not exist';
    }

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

module.exports = { userRouter };
