const { Router } = require("express");
const { body } = require("express-validator");
const { parseError } = require("../util");
const {
  getOnlineUsers,
  getOnlineUserDetails,
} = require("../services/onlineUsers");
const { addNotification, removeNotification } = require("../services/user");
const {
  getUserFriendsList,
  getUserFriendRequests,
  addUsernameToFriendRequests,
  removeUsernameFromFriendRequests,
  addUsernameToFriendsList,
} = require("../services/friends");

const friendsRouter = Router();

friendsRouter.get("/getFriendsAndTheirStatus", async (req, res) => {
  try {
    const userFriendsList = await getUserFriendsList(req.user.username);
    const onlineFriends = await getOnlineUsers(userFriendsList);

    const friendsInfo = userFriendsList.map((friend) => {
      const findFriend = onlineFriends.find(
        (onlineUser) => onlineUser.username == friend
      );

      const friendObj = { username: friend };
      if (findFriend) {
        friendObj.online = true;
        friendObj.socketId = findFriend.socketId;
        friendObj.gameInProgress = findFriend.gameInProgress;
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

friendsRouter.put(
  "/addFriendRequest",
  body("friendUsername").trim(),
  async (req, res) => {
    const result = { status: "", msg: "" };

    const friendUsername = req.body.friendUsername;
    const userUsername = req.user.username;

    try {
      const isFriendInUserFriendRequestsList = await getUserFriendRequests(
        userUsername,
        friendUsername
      );

      if (isFriendInUserFriendRequestsList) {
        result.status = "error";
        result.msg =
          friendUsername +
          " has already sent invitation to you - check notifications";
      } else {
        const addUsernameToFriendReq = await addUsernameToFriendRequests(
          friendUsername,
          userUsername
        );

        if (addUsernameToFriendReq.matchedCount == 0) {
          result.status = "error";
          result.msg = friendUsername + " does not exist";
        }

        if (
          addUsernameToFriendReq.matchedCount > 0 &&
          addUsernameToFriendReq.modifiedCount == 0
        ) {
          result.status = "error";
          result.msg = "Invitation has already been sent to " + friendUsername;
        }

        if (addUsernameToFriendReq.modifiedCount > 0) {
          const userOnline = await getOnlineUserDetails(friendUsername);
          if (userOnline) {
            result.status = "send invitation";
            result.socketId = userOnline.socketId;
          } else {
            result.status = "success";
          }

          const notification = {
            username: userUsername,
            content: " sent friend request",
            type: "friendRequest",
            notificationBtns: "Accept/Reject",
          };
          await addNotification(friendUsername, notification);

          result.msg = "Invitation sent to " + friendUsername;
        }
      }

      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.message });
    }
  }
);

friendsRouter.put(
  "/friendResponse",
  body("username").trim(),
  body("type").trim(),
  async (req, res) => {
    const userUsername = req.user.username;
    const friendUsername = req.body.username;
    const type = req.body.type;

    try {
      await removeUsernameFromFriendRequests(userUsername, friendUsername);

      let notification = {};

      if (type == "friendRequestAccepted") {
        await addUsernameToFriendsList(userUsername, friendUsername);
        await addUsernameToFriendsList(friendUsername, userUsername);

        notification = {
          username: userUsername,
          content: " accepted your friend request",
          type: "friendResponse",
          notificationBtns: "Mark as read",
        };
      } else {
        notification = {
          username: userUsername,
          content: " rejected your friend request",
          type: "friendResponse",
          notificationBtns: "Mark as read",
        };
      }

      await addNotification(friendUsername, notification);
      await removeNotification(userUsername, "friendRequest", friendUsername);

      const userOnline = await getOnlineUserDetails(friendUsername);
      const result = { status: "offline" };
      if (userOnline) {
        result.status = "online";
        result.socketId = userOnline.socketId;
        result.gameInProgress = userOnline.gameInProgress;
      }

      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.message });
    }
  }
);

module.exports = { friendsRouter };
