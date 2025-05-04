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

    // socket.on(
    //   "setAcceptGameInvitation",
    //   ({ receiverSocketId, userUsername, roomName, playersInfo }) => {
    //     socket.join(roomName);

    //     io.to(receiverSocketId).emit("getAcceptGameInvitation", {
    //       senderUsername: userUsername,
    //       roomName,
    //       playersInfo,
    //     });
    //   }
    // );

    // socket.on("joinRoom", ({ gameRoomName }) => {
    //   socket.join(gameRoomName);
    // });

    // socket.on("leaveRoom", ({ gameRoomName }) => {
    //   socket.leave(gameRoomName);
    // });

    // socket.on("sendCategorySelected", ({ receiverSocketId, socketData }) => {
    //   io.to(receiverSocketId).emit("getCategorySelected", {
    //     socketData,
    //   });
    // });

    // socket.on("sendQuestions", ({ receiverSocketId, gameQuestions }) => {
    //   io.to(receiverSocketId).emit("getQuestions", {
    //     gameQuestions,
    //   });
    // });

    // socket.on(
    //   "sendQuestionOpened",
    //   ({ receiverSocketId, categoryName, question }) => {
    //     io.to(receiverSocketId).emit("getQuestionOpened", {
    //       categoryName,
    //       question,
    //     });
    //   }
    // );

    // socket.on("sendAnswerClicked", ({ receiverSocketId, answerChosen }) => {
    //   io.to(receiverSocketId).emit("getAnswerClicked", { answerChosen });
    // });

    socket.on("disconnect", async () => {});
  });
}

module.exports = { configSocket };
