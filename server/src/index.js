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

  io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
  });

  server.listen(5000, () => 'Server is running on port 5000');

  // app.listen(5000);
  // server.listen(5000);

  // io.listen(5000);
}
