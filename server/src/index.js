// Code  for mongoose config in backend
// Filename - backend/index.js

const { connectDatabase } = require('./config/configDatabase');
const { configExpress } = require('./config/configExpress');
const { configRoutes } = require('./config/configRoutes');
const express = require('express');

start();

async function start() {
    const app = express();

    await connectDatabase();
    configExpress(app);
    configRoutes(app);

    app.listen(5000);
}

