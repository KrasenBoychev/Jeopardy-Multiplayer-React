const { Server } = require('socket.io');
const { addNewOnlineUser, removeOnlineUser } = require('../services/onlineUsers');

function configSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('newUser', async (username) => {
      await addNewOnlineUser(username, socket.id);
    });

    socket.on('sendNotification', ({ senderName, receiverName }) => {
      const receiver = getUser(receiverName);

      if (receiver) {
        io.to(receiver.socketId).emit('getNotification', {
          senderName,
        });
      }
    });

    socket.on('disconnect', async () => {
      await removeOnlineUser(socket.id);
    });
  });
}

let onlineUsers = [];

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

module.exports = { configSocket, onlineUsers };
