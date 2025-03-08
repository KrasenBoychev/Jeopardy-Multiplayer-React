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

    socket.on('sendUserIsOnline', ({ senderInfo, receiverFriends }) => {            
      receiverFriends.forEach(friend => {
        io.to(friend.socketId).emit('getFriendIsOnline', {
          senderInfo,
        });
      });
    });

    socket.on('disconnect', async () => {
      await removeOnlineUser(socket.id);
    });
  });
}


module.exports = { configSocket };
