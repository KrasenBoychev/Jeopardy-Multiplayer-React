const mongoose = require('mongoose');

async function connectDatabase() {
  await mongoose
    .connect('mongodb://localhost:27017/', {
      dbName: 'Jeopardy-Multiplayer'
    })
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      console.log('Connected to your database');
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { connectDatabase };
