const { Router } = require("express");
const { parseError } = require("../util");
const {
  getOnlineUsers,
  getOnlineUserDetails,
} = require("../services/onlineUsers");
const { getUserFriendsList, getUserByUsername } = require("../services/user");
const { getUserFriendRequests } = require("../services/friends");

const friendsRouter = Router();

friendsRouter.get("/getFriendsAndTheirStatus", async (req, res) => {
  //used
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

friendsRouter.get("/addFriendRequest/:friendUsername", async (req, res) => {
  //used
  const result = { status: "", msg: "" };

  const friendUsername = req.params.friendUsername;
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
      const friendDetails = await getUserByUsername(friendUsername);

      if (friendDetails) {
        if (friendDetails.friendRequests.includes(userUsername)) {
          result.status = "error";
          result.msg = "Invitation has already been sent to " + friendUsername;
        } else {
          const userOnline = await getOnlineUserDetails(friendUsername);

          if (userOnline) {
            result.status = "send invitation";
            result.socketId = userOnline.socketId;
          } else {
            result.status = "success";
          }

          result.msg = "Invitation sent to " + friendUsername;

          friendDetails.friendRequests.push(userUsername);
          friendDetails.notificationsList.push({
            username: userUsername,
            content: " sent friend request",
            type: "friendRequest",
            notificationBtns: "Accept/Reject",
          });
          await friendDetails.save();
        }
      } else {
        result.status = "error";
        result.msg = friendUsername + " does not exist";
      }
    }

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

module.exports = { friendsRouter };
