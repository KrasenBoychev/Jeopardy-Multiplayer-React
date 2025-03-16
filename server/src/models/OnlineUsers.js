const { Schema, model } = require("mongoose");

const OnlineUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  socketId: {
    type: String,
    required: true,
    unique: true,
  },
  gameInProgress: {
    type: Boolean,
    required: true,
  },
});

const OnlineUser = model("online_users", OnlineUserSchema);
OnlineUser.createIndexes();

module.exports = { OnlineUser };
