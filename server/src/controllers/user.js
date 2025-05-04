const { Router } = require("express");
const { body } = require("express-validator");
const { parseError } = require("../util");
const {
  getTopPlayers,
  findFriendsDetails,
  getUserNotificationsList,
  removeNotification,
  changeOnlineStatus,
  updateGameInProgress,
} = require("../services/user");
const { friendDetails } = require("./data models/friendDetails");

const userRouter = Router();

userRouter.get("/topPlayers", async (req, res) => {
  try {
    const data = await getTopPlayers();
    res.json(data);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

userRouter.post("/friendsDetails", async (req, res) => {
  try {
    const friendsDetails = await findFriendsDetails(req.body.friendsList);

    if (friendsDetails.length > 0) {
      const detailsToBeSent = friendsDetails.map((friend) => {
        return friendDetails(friend);
      });

      res.json(detailsToBeSent);
    } else {
      res.json(null);
    }
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

userRouter.get("/getNotifications", async (req, res) => {
  try {
    const data = await getUserNotificationsList(req.user.username);
    res.json(data);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

userRouter.post(
  "/removeNotification",
  body("friendUsername").trim(),
  body("type").trim(),
  async (req, res) => {
    const userUsername = req.user.username;
    const friendUsername = req.body.friendUsername;
    const type = req.body.type;

    try {
      const result = await removeNotification(
        userUsername,
        friendUsername,
        type
      );

      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.message });
    }
  }
);

userRouter.post("/changeOnlineStatus", async (req, res) => {
  try {
    const result = await changeOnlineStatus(
      req.body.username,
      req.body.socketId
    );
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

userRouter.post("/gameInProgress", async (req, res) => {
  try {
    const username = req.user.username;
    const result = await updateGameInProgress(username);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

module.exports = { userRouter };
