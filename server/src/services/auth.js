const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const { getUserByEmail, getUserByUsername } = require("./user");

async function register(email, username, password) {
  const existingEmail = await getUserByEmail(email);

  if (existingEmail) {
    throw new Error("This email is already in use");
  }

  const existingUsername = await getUserByUsername(username);

  if (existingUsername) {
    throw new Error("This username is already in use");
  }

  const user = new User({
    email,
    username,
    password: await bcrypt.hash(password, 10),
  });

  await user.save();

  return user;
}

async function login(email, password) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect email or password");
  }

  return user;
}

module.exports = {
  register,
  login,
};
