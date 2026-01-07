const { Router } = require("express");
const { body } = require("express-validator");
const { parseError } = require("../util");
const {
  getTopPlayers,
  getUserNotificationsList,
  removeNotification,
} = require("../services/user");

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

module.exports = { userRouter };
