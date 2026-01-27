// const mongoose = require("mongoose");

// async function connectDatabase() {
//   await mongoose
//     .connect(
//       "mongodb+srv://krasenboychev11_db_user:snBHKcrezslhqroY@cluster0.qr9biv1.mongodb.net/?appName=Cluster0",
//       {
//         dbName: "jeopardy_multiplayer",
//       },
//     )
//     // eslint-disable-next-line no-unused-vars
//     .then((res) => {
//       console.log("Connected to your database");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// module.exports = { connectDatabase };

const mongoose = require("mongoose");

// Use a global variable to cache the connection in serverless
let cachedConnection = null;

async function connectDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  // Use the Environment Variable instead of hardcoded string
  const uri = process.env.MONGODB_URI || "mongodb+srv://...";

  try {
    const opts = {
      dbName: "jeopardy_multiplayer",
      // Important for serverless stability
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
