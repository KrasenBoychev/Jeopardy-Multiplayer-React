// Code  for mongoose config in backend
// Filename - backend/index.js

const { connectDatabase } = require("./config/configDatabase");
const { configExpress } = require("./config/configExpress");
const { configRoutes } = require("./config/configRoutes");
const { configSocket } = require("./config/configSocket");

const express = require("express");
const http = require("http");
const port = process.env.PORT || 5000;
const app = express();

start();

async function start() {
  const server = http.createServer(app);

  await connectDatabase();
  configExpress(app);
  configRoutes(app);
  configSocket(server);

  server.listen(port);
}

module.exports = app;
