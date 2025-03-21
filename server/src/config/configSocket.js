const { Server } = require("socket.io");
const { removeOnlineUser } = require("../services/onlineUsers");

function configSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("newUser", () => {
      io.to(socket.id).emit("newUserCreated");
    });

    socket.on("sendUserStatus", ({ senderInfo, receiverFriends, action }) => {
      receiverFriends.forEach((friend) => {
        io.to(friend.socketId).emit("getFriendStatus", {
          senderInfo,
          action,
        });
      });
    });

    socket.on("sendNotification", ({ receiverSocketId, msg, data }) => {
      io.to(receiverSocketId).emit("getNotification", { msg, data });
    });

    socket.on(
      "sendGameInvitation",
      ({ receiverSocketId, userUsername, friendUsername }) => {
        socket.join(`${userUsername}-${friendUsername}`);

        io.to(receiverSocketId).emit("getGameInvitation", {
          senderUsername: userUsername,
        });
      }
    );

    socket.on(
      "setCancelGameInvitation",
      ({ receiverSocketId, userUsername, friendUsername }) => {
        socket.leave(`${userUsername}-${friendUsername}`);

        io.to(receiverSocketId).emit("getCancelGameInvitation", {
          senderUsername: userUsername,
        });
      }
    );

    socket.on(
      "setRejectGameInvitation",
      ({ receiverSocketId, userUsername }) => {
        io.to(receiverSocketId).emit("getRejectGameInvitation", {
          senderUsername: userUsername,
        });
      }
    );

    socket.on("leaveRoom", ({ userUsername, friendUsername }) => {
      socket.leave(`${userUsername}-${friendUsername}`);
    });

    socket.on("disconnect", async () => {});
  });
}

module.exports = { configSocket };
