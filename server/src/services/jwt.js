const jwt = require("jsonwebtoken");

const secret = "super secr3t";

function createToken(email, username, _id) {
  const payload = {
    email,
    username,
    _id,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });

  return token;
}

function verifyToken(token) {
  const data = jwt.verify(token, secret);

  return data;
}

module.exports = {
  createToken,
  verifyToken,
};
