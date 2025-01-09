// Code  for mongoose config in backend
// Filename - backend/index.js

const { connectDatabase } = require("./config/configDatabase");
const { configExpress } = require("./config/configExpress");
const { configRoutes } = require("./config/configRoutes");
const express = require("express");
const Server = require("socket.io");

// const http = require("http");
start();

async function start() {
  const app = express();

  await connectDatabase();
  configExpress(app);
  configRoutes(app);

  //   const server = http.createServer(app);

  app.listen(5000);
  // server.listen(5000);

  // const io = new Server({
  //   cors: {
  //     origin: "http://localhost:5173",
  //   },
  // });

  // io.listen(5000);
}
