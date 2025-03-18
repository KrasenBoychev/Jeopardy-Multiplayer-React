const { Router } = require("express");
const { body } = require("express-validator");
const { parseError } = require("../util");
const {
  getUserByUsername,
  getTopPlayers,
  getPlayerPoints,
  getUserNotificationsList,
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


// Not Used Yet

// userRouter.get("/removeNotification/:friendUsername", async (req, res) => {
//   const username = req.user.username;
//   const friendUsername = req.params.friendUsername;

//   try {
//     const getUser = await getUserByUsername(username);
//     const user = getUser[0];
//     user.notificationsList = user.notificationsList.filter((notification) => {
//       notification.username !== friendUsername;
//     });

//     await user.save();

//     const result = { notifications: user.notificationsList };

//     res.json(result);
//   } catch (err) {
//     const parsed = parseError(err);
//     res.status(400).json({ code: 400, message: parsed.message });
//   }
// });

module.exports = { userRouter };
