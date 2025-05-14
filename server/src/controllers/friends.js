const { Router } = require("express");
const { body } = require("express-validator");
const { parseError } = require("../util");
const {
  getUserFriendsList,
  getUserNotificationsList,
  getUserSocketId,
  addUsernameToFriendsList,
  addNotification,
  removeNotification,
  getUserByUsername,
} = require("../services/user");
const { friendDetailsModel } = require("./data models/friendDetails");

const friendsRouter = Router();

friendsRouter.post(
  "/sendFriendReq",
  body("friendUsername").trim(),
  async (req, res) => {
    let result = { status: "success", msg: "" };

    const friendUsername = req.body.friendUsername;
    const userUsername = req.user.username;

    try {
      const userFriendsList = await getUserFriendsList(userUsername);

      if (userFriendsList.includes(friendUsername)) {
        result.status = "error";
        result.msg = friendUsername + " is in your Friends List";
      }

      if (result.status == "success") {
        const friendNotifications = await getUserNotificationsList(
          friendUsername
        );

        const findNotification = friendNotifications.find(
          (notification) =>
            notification.type == "addFriendReq" &&
            notification.sentBy == userUsername
        );
        if (findNotification) {
          result.status = "error";
          result.msg =
            "You have already sent friend request to " + friendUsername;
        }
      }

      if (result.status == "success") {
        const userNotifications = await getUserNotificationsList(userUsername);

        const findNotification = userNotifications.find(
          (notification) =>
            notification.type == "addFriendReq" &&
            notification.sentBy == friendUsername
        );
        if (findNotification) {
          result.status = "error";
          result.msg =
            friendUsername +
            " has already sent friend request to you - check notifications";
        }
      }

      if (result.status == "success") {
        const newNotification = {
          type: "addFriendReq",
          sentBy: userUsername,
        };
        const response = await addNotification(friendUsername, newNotification);

        if (response.matchedCount == 0) {
          result.status = "error";
          result.msg = friendUsername + " does not exist";
        } else {
          const friendSocketId = await getUserSocketId(friendUsername);
          result.friendSocketId = friendSocketId[0];
        }
      }

      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.message });
    }
  }
);

friendsRouter.post(
  "/sendFriendRes",
  body("friendUsername").trim(),
  body("response").trim(),
  async (req, res) => {
    const userUsername = req.user.username;
    const friendUsername = req.body.friendUsername;
    const response = req.body.response;

    let newNotification;
    try {
      if (response == "accepted") {
        await addUsernameToFriendsList(userUsername, friendUsername);
        await addUsernameToFriendsList(friendUsername, userUsername);

        newNotification = {
          type: "acceptFriendReq",
          sentBy: userUsername,
        };
      } else if (response == "rejected") {
        newNotification = {
          type: "rejectFriendReq",
          sentBy: userUsername,
        };
      }

      await removeNotification(userUsername, friendUsername, "addFriendReq");
      await addNotification(friendUsername, newNotification);

      const getFriendDetails = await getUserByUsername(friendUsername);

      result = friendDetailsModel(getFriendDetails);

      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.message });
    }
  }
);

module.exports = { friendsRouter };
