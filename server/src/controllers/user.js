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


// userRouter.get("/friendResponse/:data", async (req, res) => {
//   const sentDataDetails = JSON.parse(req.params.data);
//   const friendUsername = sentDataDetails.username;
//   const result = {
//     status: "offline",
//     friendSocketDetails: "",
//     userDetails: { notifications: "", friends: "" },
//   };

//   try {
//     const getUser = await getUserByUsername(req.user.username);
//     const userDetails = getUser[0];
//     userDetails.friendRequests = userDetails.friendRequests.filter(
//       (friend) => friend !== friendUsername
//     );

//     const getFriendUser = await getUserByUsername(friendUsername);
//     const friendDetails = getFriendUser[0];

//     if (sentDataDetails.status == "friendRequestAccepted") {
//       if (!userDetails.friendsList.includes(friendUsername)) {
//         userDetails.friendsList.push(friendUsername);
//       }
//       result.userDetails.friends = userDetails.friendsList;

//       if (!friendDetails.friendsList.includes(userDetails.username)) {
//         friendDetails.friendsList.push(userDetails.username);
//       }

//       friendDetails.notificationsList.push({
//         username: userDetails.username,
//         content: " accepted your friend request",
//         type: "friendResponse",
//         notificationBtns: "Mark as read",
//       });
//     } else {
//       friendDetails.notificationsList.push({
//         username: userDetails.username,
//         content: " rejected your friend request",
//         type: "friendResponse",
//         notificationBtns: "Mark as read",
//       });
//     }

//     userDetails.notificationsList = userDetails.notificationsList.filter(
//       (notification) => {
//         notification.username !== friendUsername;
//       }
//     );

//     result.userDetails.notifications = userDetails.notificationsList;

//     await friendDetails.save();
//     await userDetails.save();

//     // const userOnline = await checkIfUserIsOnline(friendUsername);

//     if (userOnline) {
//       result.status = "online";
//       result.friendSocketDetails = userOnline.onlineUsers[0];
//     }

//     res.json(result);
//   } catch (err) {
//     const parsed = parseError(err);
//     res.status(400).json({ code: 400, message: parsed.message });
//   }
// });

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
