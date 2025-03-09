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

    socket.on('sendUserStatus', ({ senderInfo, receiverFriends, logout }) => {          
      receiverFriends.forEach(friend => {
        io.to(friend.socketId).emit('getFriendStatus', {
          senderInfo,
          logout
        });
      });
    });

    socket.on('disconnect', async () => {
      await removeOnlineUser(socket.id);
    });
  });
}


module.exports = { configSocket };
