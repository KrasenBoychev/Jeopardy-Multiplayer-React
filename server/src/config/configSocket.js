const { Server } = require("socket.io");
// const { removeOnlineUser } = require("../services/onlineUsers");

function configSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("newUserConnected", () => {
      io.to(socket.id).emit("setConnectedUser", {});
    });

    socket.on("sendUserStatus", ({ senderInfo, receiverFriends }) => {
      receiverFriends.forEach((friend) => {
        io.to(friend.socketId).emit("getFriendStatus", {
          senderInfo,
        });
      });
    });

    socket.on("sendExitUserStatus", ({ senderInfo, receiverFriends }) => {
      receiverFriends.forEach((friend) => {
        io.to(friend.socketId).emit("getExitUserStatus", {
          senderInfo,
        });
      });
    });

    socket.on("setUpdateNotifications", ({ receiverSocketId }) => {
      io.to(receiverSocketId).emit("getUpdateNotifications", {});
    });

    socket.on("setFriendReqAccepted", ({ receiverSocketId, userDetails }) => {
      io.to(receiverSocketId).emit("getFriendReqAccepted", {
        userDetails,
      });
    });

    socket.on("sendGameReq", ({ receiverSocketId, username }) => {
      io.to(receiverSocketId).emit("receiveGameReq", {
        username,
      });
    });

    socket.on("sendRejectGameRes", ({ receiverSocketId, username }) => {
      io.to(receiverSocketId).emit("receiveRejectGameRes", {
        username,
      });
    });

    socket.on("setCancelGameInvitation", ({ receiverSocketId, username }) => {
      io.to(receiverSocketId).emit("getCancelGameInvitation", {
        username,
      });
    });

    socket.on("sendAcceptGameRes", ({ receiverSocketId }) => {
      io.to(receiverSocketId).emit("getAcceptGameRes", {});
    });

    socket.on("sendFriendGameInProgress", ({ receiverFriends, username }) => {
      receiverFriends.forEach((friend) => {
        io.to(friend.socketId).emit("getFriendGameInProgress", {
          username,
        });
      });
    });

    socket.on("sendGameDetails", ({ receiverSocketId, gameDetails }) => {
      io.to(receiverSocketId).emit("getGameDetails", {
        gameDetails,
      });
    });

    socket.on("setReadyToPlay", ({ receiverSocketId }) => {
      io.to(receiverSocketId).emit("getReadyToPlay", {});
    });

    socket.on("setExitGame", ({ receiverSocketId, username }) => {
      io.to(receiverSocketId).emit("getExitGame", {
        username,
      });
    });

    socket.on(
      "sendCategorySelected",
      ({ receiverSocketId, categorySelected, index }) => {
        io.to(receiverSocketId).emit("getCategorySelected", {
          categorySelected,
          index,
        });
      }
    );

    socket.on(
      "sendQuestionsSelected",
      ({ receiverSocketId, questionsSelected }) => {
        io.to(receiverSocketId).emit("getQuestionsSelected", {
          questionsSelected,
        });
      }
    );

    socket.on("sendQuestionChosen", ({ receiverSocketId, questionChosen }) => {
      io.to(receiverSocketId).emit("getQuestionChosen", {
        questionChosen,
      });
    });

    socket.on("disconnect", async () => {});
  });
}

module.exports = { configSocket };
