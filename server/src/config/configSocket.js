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

    socket.on("sendGameInvitation", ({ receiverSocketId, userUsername }) => {
      io.to(receiverSocketId).emit("getGameInvitation", {
        senderUsername: userUsername,
      });
    });

    socket.on(
      "setCancelGameInvitation",
      ({ receiverSocketId, userUsername }) => {
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

    socket.on(
      "setAcceptGameInvitation",
      ({ receiverSocketId, userUsername, roomName, playersInfo }) => {
        socket.join(roomName);

        io.to(receiverSocketId).emit("getAcceptGameInvitation", {
          senderUsername: userUsername,
          roomName,
          playersInfo,
        });
      }
    );

    socket.on("joinRoom", ({ gameRoomName }) => {
      socket.join(gameRoomName);
    });

    socket.on("leaveRoom", ({ gameRoomName }) => {
      socket.leave(gameRoomName);
    });

    socket.on(
      "setExitGame",
      ({ receiverSocketId, userUsername, gameRoomName }) => {
        socket.leave(gameRoomName);

        io.to(receiverSocketId).emit("getExitGame", {
          senderUsername: userUsername,
          gameRoomName,
        });
      }
    );

    socket.on("sendCategorySelected", ({ receiverSocketId, socketData }) => {
      io.to(receiverSocketId).emit("getCategorySelected", {
        socketData,
      });
    });

    socket.on("sendQuestions", ({ receiverSocketId, gameQuestions }) => {
      io.to(receiverSocketId).emit("getQuestions", {
        gameQuestions,
      });
    });

    socket.on("disconnect", async () => {});
  });
}

module.exports = { configSocket };
