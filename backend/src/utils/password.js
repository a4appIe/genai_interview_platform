const argon2 = require("argon2");

async function hashPassword(password) {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    console.error(`Something went wrong while generating password`, error);
  }
}
async function verifyPassword(userPassword, password) {
  try {
    const isVerified = await argon2.verify(userPassword, password);
    return isVerified;
  } catch (error) {
    console.error(`Something went wrong while verifying password`, error);
  }
}

module.exports = { hashPassword, verifyPassword };
