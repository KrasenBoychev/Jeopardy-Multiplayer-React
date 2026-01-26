const mongoose = require("mongoose");

async function connectDatabase() {
  await mongoose
    .connect(
      "mongodb+srv://krasenboychev11_db_user:snBHKcrezslhqroY@cluster0.qr9biv1.mongodb.net/?appName=Cluster0",
      {
        dbName: "Jeopardy-Multiplayer",
      },
    )
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      console.log("Connected to your database");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { connectDatabase };
