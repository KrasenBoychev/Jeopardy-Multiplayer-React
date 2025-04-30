const { Router } = require("express");
const { body } = require("express-validator");
const { parseError } = require("../util");
const {
  getTopPlayers,
  changeOnlineStatus,
  findOnlineFriends,
  // getUserNotificationsList,
  // removeNotification,
  // updateGameInProgress,
} = require("../services/user");
// const {
//   addNewOnlineUser,
//   deleteOnlineUser,
// } = require("../services/onlineUsers");

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

userRouter.post("/onlineFriends", async (req, res) => {
  try {
    const friendsDetails = await findOnlineFriends(req.body.friendsList);

    if (friendsDetails.length > 0) {
      const detailsToBeSent = friendsDetails.map((friend) => {
        return {
          username: friend.username,
          online: friend.gameDetails.online,
          socketId: friend.gameDetails.socketId,
          gameInProgress: friend.gameDetails.gameInProgress,
        };
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

// userRouter.get("/getUserNotifications", async (req, res) => {
//   try {
//     const data = await getUserNotificationsList(req.user.username);
//     res.json(data);
//   } catch (err) {
//     const parsed = parseError(err);
//     res.status(400).json({ code: 400, message: parsed.message });
//   }
// });

// userRouter.put(
//   "/removeNotification",
//   body("friendUsername").trim(),
//   body("type").trim(),
//   async (req, res) => {
//     const userUsername = req.user.username;
//     const friendUsername = req.body.friendUsername;
//     const type = req.body.type;

//     try {
//       const result = await removeNotification(
//         userUsername,
//         type,
//         friendUsername
//       );

//       res.json(result);
//     } catch (err) {
//       const parsed = parseError(err);
//       res.status(400).json({ code: 400, message: parsed.message });
//     }
//   }
// );

// userRouter.delete("/deleteOnlineUser", async (req, res) => {
//   try {
//     const username = req.user.username;
//     await deleteOnlineUser(username);
//     res.json(`${username} deleted`);
//   } catch (err) {
//     const parsed = parseError(err);
//     res.status(400).json({ code: 400, message: parsed.message });
//   }
// });

// userRouter.put("/gameInProgress", async (req, res) => {
//   try {
//     const username = req.user.username;
//     await updateGameInProgress(username);
//     res.json(`game in progress updated for ${username}`);
//   } catch (err) {
//     const parsed = parseError(err);
//     res.status(400).json({ code: 400, message: parsed.message });
//   }
// });

module.exports = { userRouter };
