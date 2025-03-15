const { Server } = require("socket.io");
const {
  addNewOnlineUser,
  removeOnlineUser,
} = require("../services/onlineUsers");

function configSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("newUser", async (username) => {
      await addNewOnlineUser(username, socket.id);

      const count = io.engine.clientsCount;
      const c = Object.keys(io.engine.clients);
      

      console.log(count);
      console.log(c);

      // io.to(socket.id).emit("getClients", { clients });
    });

    // socket.on("sendClientsReq", ({}) => {
    //   const clients = io.sockets.clients();
    //   io.to(friend.socketId).emit("getClients", { clients });
    // });

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

    socket.on("sendGameInvitation", ({ receiverSocketId, data }) => {
      io.to(receiverSocketId).emit("getGameInvitation", { data });
    });

    socket.on("sendGameRejection", ({ receiverSocketId }) => {
      io.to(receiverSocketId).emit("getGameRejection", {});
    });

    socket.on("disconnect", async () => {
      await removeOnlineUser(socket.id);
    });
  });
}

module.exports = { configSocket };
