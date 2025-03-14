const { Router } = require('express');
const { parseError } = require('../util');
const {
  getUserByUsername,
  getTopPlayers,
  getPlayerPoints,
  getUserFriendRequests,
  getUserNotificationsList,
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

userRouter.get('/getUserNotifications', async (req, res) => {
  try {
    const data = await getUserNotificationsList(req.user.username);
    res.json(data);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

userRouter.get('/friendRequest/:username', async (req, res) => {
  const result = { status: '', msg: '' };
  let isError = false;

  const friendUsername = req.params.username;
  const userUsername = req.user.username;

  try {
    const userFriendRequests = await getUserFriendRequests(req.user._id);

    if (userFriendRequests.includes(friendUsername)) {
      result.status = 'error';
      result.msg = friendUsername + ' has already sent invitation to you - check notifications';
      isError = true;
    }

    if (!isError) {
      const getFriendUser = await getUserByUsername(friendUsername);

      if (getFriendUser.length > 0) {
        const friend = getFriendUser[0];

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
          friend.notificationsList.push(
            {
              username: userUsername,
              content: ' sent friend request',
              type: 'friendRequest',
              notificationBtns: 'Accept/Reject'
            }
          );
          await friend.save();

        }
      } else {
        result.status = 'error';
        result.msg = friendUsername + ' does not exist';
      }
    }

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

userRouter.get('/friendResponse/:data', async (req, res) => {
  const sentDataDetails = JSON.parse(req.params.data);
  const friendUsername = sentDataDetails.username;
  const result = { status: 'offline', friendSocketDetails: '', userDetails: { notifications: '', friends: '' } };

  try {
    const getUser = await getUserByUsername(req.user.username);
    const userDetails = getUser[0];
    userDetails.friendRequests = userDetails.friendRequests.filter((friend) => friend !== friendUsername);

    const getFriendUser = await getUserByUsername(friendUsername);
    const friendDetails = getFriendUser[0];

    if (sentDataDetails.status == 'friendRequestAccepted') {
      if (!userDetails.friendsList.inclueds(friendUsername)) {
        userDetails.friendsList.push(friendUsername);
      }
      result.userDetails.friends = userDetails.friendsList;

      if (!friendDetails.friendsList.incudes(userDetails.username)) {
        friendDetails.friendsList.push(userDetails.username);
      }

      friendDetails.notificationsList.push(
        {
          username: userDetails.username,
          content: ' accepted your friend request',
          type: 'friendResponse',
          notificationBtns: 'Mark as read'
        }
      );
    } else {
      friendDetails.notificationsList.push(
        {
          username: userDetails.username,
          content: ' rejected your friend request',
          type: 'friendResponse',
          notificationBtns: 'Mark as read'
        }
      );
    }

    userDetails.notificationsList = userDetails.notificationsList.filter((notification) => {
      notification.username !== friendUsername
    });

    result.userDetails.notifications = userDetails.notificationsList;

    await friendDetails.save();
    await userDetails.save();

    const userOnline = await checkIfUserIsOnline(friendUsername);

    if (userOnline) {
      result.status = 'online';
      result.friendSocketDetails = userOnline.onlineUsers[0];
    }

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

userRouter.get('/removeNotification/:friendUsername', async (req, res) => {
  const username = req.user.username;
  const friendUsername = req.params.friendUsername;

  try {
    const getUser = await getUserByUsername(username);
    const user = getUser[0];
    user.notificationsList = user.notificationsList.filter((notification) => {
      notification.username !== friendUsername
    });

    await user.save();

    const result = { notifications: user.notificationsList };

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

module.exports = { userRouter };
