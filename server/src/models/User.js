const { Schema, model } = require('mongoose');

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
  points: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = model('users', UserSchema);
User.createIndexes();

module.exports = { User };
