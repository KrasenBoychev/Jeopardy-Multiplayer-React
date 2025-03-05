// Code  for mongoose config in backend
// Filename - backend/index.js

const { connectDatabase } = require('./config/configDatabase');
const { configExpress } = require('./config/configExpress');
const { configRoutes } = require('./config/configRoutes');
const express = require('express');

const http = require('http');
const { Server } = require('socket.io');
start();

async function start() {
  const app = express();

  await connectDatabase();
  configExpress(app);
  configRoutes(app);

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  let onlineUsers = [];

  const addNewUser = (username, socketId) => {
    !onlineUsers.some((user) => user.username === username) &&
      onlineUsers.push({ username, socketId });
  };

  const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  };

  const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
  };

  io.on('connection', (socket) => {
    socket.on('newUser', (username) => {
      addNewUser(username, socket.id);
    });

    socket.on('sendNotification', ({ senderName, receiverName }) => {
      const receiver = getUser(receiverName);

      if (receiver) {
        io.to(receiver.socketId).emit('getNotification', {
          senderName,
        });
      }
    });

    socket.on('disconnect', () => {
      removeUser(socket.id);
      console.log('disconnected');
    });
  });

  server.listen(5000);

  // app.listen(5000);
  // server.listen(5000);

  // io.listen(5000);
}
