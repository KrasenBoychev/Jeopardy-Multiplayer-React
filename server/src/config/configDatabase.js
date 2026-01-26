const mongoose = require("mongoose");

let cachedConnection = null;

async function connectDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const uri = process.env.MONGODB_URI || "mongodb+srv://...";

  try {
    const opts = {
      dbName: "jeopardy_multiplayer",
      bufferCommands: false,
    };

    cachedConnection = await mongoose.connect(uri, opts);
    console.log("Connected to your database");
    return cachedConnection;
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
}

module.exports = { connectDatabase };
