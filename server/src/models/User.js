const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gameDetails: {
    points: {
      type: Number,
      default: 0,
    },
    friendsList: {
      type: Array,
      default: [],
    },
    online: {
      type: Boolean,
      default: false,
    },
    gameInProgress: {
      type: Boolean,
      default: false,
    },
  },
  notificationsList: {
    type: Array,
    default: [],
  },
});

const User = model("users", UserSchema);
User.createIndexes();

module.exports = { User };
