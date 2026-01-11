const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const {
  getAllCategories,
  getQuestion,
  updatePoints,
} = require("../services/game");

function configSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  const activeUsers = new Map();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  io.on("connection", (socket) => {
    socket.on("identify", (username) => {
      activeUsers.set(socket.id, {
        username: username,
        status: "Online",
      });

      io.emit("user_list_update", Array.from(activeUsers));
    });

    socket.on("start_game", async ({ targetUserId }) => {
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
          {
            username: activeUsers.get(socket.id).username,
            socketId: socket.id,
            earnedPoints: 0,
          },
          {
            username: activeUsers.get(targetSocket.id).username,
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

        // 5. Send categories to both players
        try {
          const allCategories = await getAllCategories();

          await delay(2000);

          io.to(roomId).emit("get_categories", {
            allCategories,
          });
        } catch (error) {
          console.error("Database error:", error);
          socket.emit(
            "game_error_message",
            "Could not fetch data. You will be redirected automatically"
          );
        }
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

    socket.on(
      "send_category_selected",
      async ({ roomId, selectedCategory, selectedCategoriesIDs }) => {
        io.to(roomId).emit("get_category_selected", {
          selectedCategory: selectedCategory,
        });

        if (selectedCategoriesIDs) {
          const allQuestions = [];
          const pointsList = [5, 10, 15, 20];

          try {
            for (let p = 0; p < pointsList.length; p++) {
              for (let c = 0; c < selectedCategoriesIDs.length; c++) {
                const receivedQuestion = await getQuestion(
                  selectedCategoriesIDs[c],
                  pointsList[p]
                );

                allQuestions.push(receivedQuestion[0]);
              }
            }

            const transformQuestions = allQuestions.map((question) => ({
              ...question,
              answered: false,
            }));

            await delay(2000);

            io.to(roomId).emit("get_questions_selected", {
              transformQuestions,
            });
          } catch (error) {
            console.error("Database error:", error);
            socket.emit(
              "game_error_message",
              "Could not fetch data. You will be redirected automatically"
            );
          }
        }
      }
    );

    socket.on("send_question_chosen", ({ roomId, question }) => {
      io.to(roomId).emit("get_question_chosen", {
        question,
      });
    });

    socket.on(
      "send_answer_chosen",
      ({
        roomId,
        answer,
        setIsAnswerCorrect,
        playerToUpdate,
        pointsToAdd,
        questionChosen,
      }) => {
        io.to(roomId).emit("get_answer_chosen", {
          answer,
          setIsAnswerCorrect,
          playerToUpdate,
          pointsToAdd,
          questionChosen,
        });
      }
    );

    socket.on(
      "send_game_result",
      async ({ roomId, firstPlayer, secondPlayer }) => {
        try {
          await updatePoints(firstPlayer.username, firstPlayer.earnedPoints);
          await updatePoints(secondPlayer.username, secondPlayer.earnedPoints);

          await delay(2000);

          io.to(roomId).emit("get_game_result", {});
        } catch (error) {
          console.error("Database error:", error);
          socket.emit(
            "game_error_message",
            "Could not fetch data. You will be redirected automatically"
          );
        }
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
