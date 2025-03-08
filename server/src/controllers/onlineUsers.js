const { Router } = require('express');
const { parseError } = require('../util');
const { addNewOnlineUser, getOnlineFriends } = require('../services/onlineUsers');
const { getUserFriendsList } = require('../services/user');

const onlineUsersRouter = Router();

onlineUsersRouter.get('/addNewUser', async (req, res) => {
  try {
    await addNewOnlineUser();
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

onlineUsersRouter.get('/friendsOnline/:userId', async (req, res) => {
  try {
    const userFriendsList = await getUserFriendsList(req.params.userId);
    const onlineFriends = await getOnlineFriends(userFriendsList);
    
    const friendsInfo = userFriendsList.map((friend) => {
      const findFriend = onlineFriends.find((onlineUser) => onlineUser.username == friend);
      
      const friendObj = { username: friend };
      if (findFriend) {
        friendObj.online = true;
        friendObj.socketId = findFriend.socketId;
      } else {
        friendObj.online = false;
      }

      return friendObj;
    });

    res.json(friendsInfo);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

module.exports = { onlineUsersRouter };
