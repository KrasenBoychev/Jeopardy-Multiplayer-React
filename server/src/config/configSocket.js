const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

function configSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  const activeUsers = new Map();

  io.on("connection", (socket) => {
    socket.on("identify", (username) => {
      activeUsers.set(socket.id, {
        username: username,
        status: "Online",
      });

      // Notify others that a specific named user joined
      io.emit("user_list_update", Array.from(activeUsers));
    });

    socket.on("start_game", ({ targetUserId }) => {
      const roomId = `room-${socket.id}-${targetUserId}`;
      const targetSocket = [...io.sockets.sockets.values()].find(
        (s) => s.id === targetUserId
      );

      if (targetSocket) {
        // 1. Join both players to the room
        socket.join(roomId);
        targetSocket.join(roomId);

        // 3. Update status safely
        if (activeUsers.has(socket.id)) {
          activeUsers.get(socket.id).status = "In Game";
        }
        if (activeUsers.has(targetSocket.id)) {
          activeUsers.get(targetSocket.id).status = "In Game";
        }

        // 3. Notify the two players the game has started
        io.to(roomId).emit("game_started", {
          roomId,
          players: [socket.username, targetSocket.username],
        });

        // 4. Notify everyone else to update their UI (e.g., gray out their names)
        io.emit("user_list_update", Array.from(activeUsers));
      }
    });

    // socket.on("sendUserStatus", ({ senderInfo, receiverFriends }) => {
    //   receiverFriends.forEach((friend) => {
    //     io.to(friend.socketId).emit("getFriendStatus", {
    //       senderInfo,
    //     });
    //   });
    // });

    // socket.on("sendExitUserStatus", ({ senderInfo, receiverFriends }) => {
    //   receiverFriends.forEach((friend) => {
    //     io.to(friend.socketId).emit("getExitUserStatus", {
    //       senderInfo,
    //     });
    //   });
    // });

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

    socket.on(
      "sendAnswerChosen",
      ({ receiverSocketId, answer, setIsAnswerCorrect }) => {
        io.to(receiverSocketId).emit("getAnswerChosen", {
          answer,
          setIsAnswerCorrect,
        });
      }
    );

    // socket.on("disconnect", (reason) => {
    //   console.log(`User ${socket.id} disconnected due to: ${reason}`);
    //   socket.broadcast.emit("user_left", { userId: socket.id });
    // });

    // 2. Handle Disconnect
    socket.on("disconnect", () => {
      // const username = activeUsers.get(socket.id);
      // if (username) {
      //   console.log(`${username} left the building.`);
      //   activeUsers.delete(socket.id); // Remove from map

      const userRooms = Array.from(socket.rooms);
      userRooms.forEach((room) => {
        if (room.startsWith("room-")) {
          // Notify the opponent left in this specific room
          socket.to(room).emit("opponent_disconnected");
        }
      });

      activeUsers.delete(socket.id);

      // Send the updated list of remaining names to everyone
      io.emit("user_list_update", Array.from(activeUsers));
      // }
    });
  });
}

module.exports = { configSocket };
