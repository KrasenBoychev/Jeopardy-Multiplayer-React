const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  personalDetails: {
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
  },
  gameDetails: {
    points: {
      type: Number,
      default: 0,
    },
    friendsList: {
      type: Array,
      required: true,
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
    required: true,
    default: [],
  },
});
const User = model("users", UserSchema);
User.createIndexes();

module.exports = { User };
