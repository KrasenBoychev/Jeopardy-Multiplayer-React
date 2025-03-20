const { Router } = require("express");
const { body } = require("express-validator");
const { parseError } = require("../util");
const {
  getTopPlayers,
  getPlayerPoints,
  getUserNotificationsList,
  removeNotification,
} = require("../services/user");
const {
  addNewOnlineUser,
  deleteOnlineUser,
} = require("../services/onlineUsers");

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

userRouter.get("/playerPoints", async (req, res) => {
  try {
    const data = await getPlayerPoints(req.user.username);
    res.json(data);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

userRouter.get("/getUserNotifications", async (req, res) => {
  try {
    const data = await getUserNotificationsList(req.user.username);
    res.json(data);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

userRouter.post(
  "/recordNewUser",
  body("username").trim(),
  body("socketId").trim(),
  async (req, res) => {
    try {
      const onlineUser = await addNewOnlineUser(
        req.body.username,
        req.body.socketId
      );
      res.json(onlineUser);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.message });
    }
  }
);

userRouter.delete("/deleteUser", async (req, res) => {
  try {
    const username = req.user.username;
    await deleteOnlineUser(username);
    res.json(`${username} deleted`);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

userRouter.put(
  "/removeNotification",
  body("friendUsername").trim(),
  body("type").trim(),
  async (req, res) => {
    const userUsername = req.user.username;
    const friendUsername = req.body.friendUsername;
    const type = req.body.type;

    try {
      const result = await removeNotification(userUsername, type, friendUsername);

      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.message });
    }
  }
);

module.exports = { userRouter };
