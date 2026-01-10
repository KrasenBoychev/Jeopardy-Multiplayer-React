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

      io.emit("user_list_update", Array.from(activeUsers));
    });

    socket.on("start_game", ({ targetUserId }) => {
      const roomId = `room-${socket.id}-${targetUserId}`;
      const targetSocket = [...io.sockets.sockets.values()].find(
        (s) => s.id === targetUserId
      );

      if (targetSocket) {
        socket.join(roomId);
        targetSocket.join(roomId);

        if (activeUsers.has(socket.id)) {
          activeUsers.get(socket.id).status = "In Game";
        }
        if (activeUsers.has(targetSocket.id)) {
          activeUsers.get(targetSocket.id).status = "In Game";
        }

        let players = [
          { username: socket.username, socketId: socket.id, earnedPoints: 0 },
          {
            username: targetSocket.username,
            socketId: targetSocket.id,
            earnedPoints: 0,
          },
        ];

        if (Math.random() > 0.5) {
          [players[0], players[1]] = [players[1], players[0]];
        }

        // 3. Notify the two players the game has started
        io.to(roomId).emit("game_started", {
          roomId,
          players,
        });

        // 4. Notify everyone else to update their UI (e.g., gray out their names)
        io.emit("user_list_update", Array.from(activeUsers));
      }
    });

    socket.on("set_update_notifications", ({ receiverSocketId }) => {
      io.to(receiverSocketId).emit("get_update_notifications", {});
    });

    socket.on("set_friend_req_accepted", ({ receiverSocketId }) => {
      io.to(receiverSocketId).emit("get_friend_req_accepted", {});
    });

    socket.on("send_game_req", ({ receiverSocketId, username }) => {
      io.to(receiverSocketId).emit("receive_game_req", {
        username,
      });
    });

    socket.on("send_reject_game_res", ({ receiverSocketId, username }) => {
      io.to(receiverSocketId).emit("receive_reject_game_res", {
        username,
      });
    });

    socket.on(
      "set_cancel_game_invitation",
      ({ receiverSocketId, username }) => {
        io.to(receiverSocketId).emit("get_cancel_game_invitation", {
          username,
        });
      }
    );

    socket.on("send_categories", ({ roomId, allCategories }) => {
      io.to(roomId).emit("get_categories", {
        allCategories,
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

    socket.on("leave_game", ({ roomId }) => {
      socket.leave(roomId);

      if (activeUsers.has(socket.id)) {
        activeUsers.get(socket.id).status = "Online";
      }

      socket.to(roomId).emit("opponent_left");

      io.emit("user_list_update", Array.from(activeUsers));
    });

    socket.on("disconnecting", () => {
      const userRooms = Array.from(socket.rooms);

      userRooms.forEach((room) => {
        if (room.startsWith("room-")) {
          socket.to(room).emit("opponent_disconnected");
        }
      });

      activeUsers.delete(socket.id);

      io.emit("user_list_update", Array.from(activeUsers));
    });
  });
}

module.exports = { configSocket };
