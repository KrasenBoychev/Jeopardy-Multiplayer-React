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

    socket.on("sendGameInvitation", ({ receiverSocketId, username }) => {
      // console.log(receiverSocketId.rooms);
      // TODO
      // check if the friendSocketId is not connected to another room
      io.to(receiverSocketId).emit("getGameInvitation", { username });
    });

    // socket.on("sendGameRejection", ({ receiverSocketId }) => {
    //   io.to(receiverSocketId).emit("getGameRejection", {});
    // });

    socket.on("disconnect", async () => {});
  });
}

module.exports = { configSocket };
