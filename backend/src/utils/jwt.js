const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
