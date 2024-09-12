const { User } = require('../models/User');
const bcrypt = require('bcrypt');

async function register(email, username, password) {
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new Error('This email is already in use');
  }

  const existingUsername = await User.findOne({ username });

  if (existingUsername) {
    throw new Error('This username is already in use');
  }

  const user = new User({
    email,
    username,
    points: 0,
    password: await bcrypt.hash(password, 10)
  });

  await user.save();

  return user;
}

async function login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Incorrect email or password');
    }

    return user;
}

async function getTopPlayers() {
  return await User.find({}).sort({ points: -1 }).limit(8);
}

module.exports = {
    register,
    login,
    getTopPlayers,
};