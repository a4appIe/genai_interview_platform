const { generateToken } = require("../../utils/jwt");
const { hashPassword, verifyPassword } = require("../../utils/password");
const { sendError, sendResponse } = require("./../../utils/response");
const userModel = require("./user.model");

/**
 * @name registerUserService
 * @description Register new user
 * @access Public
 * @param res
 * @param data
 */
async function registerUserService(res, data) {
  try {
    const { username, email, password } = data;
    if (!username || !email || !password) {
      sendError(res, 400, "Please provide all fields");
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (isUserAlreadyExists) {
      sendError(res, 400, "Account already exists with this username or email");
    }

    const hash = await hashPassword(password);
    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = generateToken({
      id: user?._id,
      username: user?.username,
      email: user?.email,
    });
    res.cookie("token", token);

    return sendResponse(res, 201, "User created", {
      id: user?._id,
      username: user?.username,
      email: user?.email,
    });
  } catch (error) {
    console.error(`Something went wrong in register user service`);
  }
}

/**
 * @name loginUserService
 * @description Login user
 * @access Public
 * @param res
 * @param data
 */
async function loginUserService(res, data) {
  try {
    const { email, password } = data;
    const user = await userModel.findOne({ email });
    if (!user) {
      sendError(res, 404, "User not found");
    }

    const isPasswordVerified = await verifyPassword(user?.password, password);
    if (!isPasswordVerified) {
      sendError(res, 400, "Invalid email or password");
    }

    const token = generateToken({
      id: user?._id,
      username: user?.username,
      email: user?.email,
    });
    res.cookie("token", token);

    return sendResponse(res, 200, "User logged in", {
      id: user?._id,
      username: user?.username,
      email: user?.email,
    });
  } catch (error) {
    console.error(`Something went wrong in login user service`);
  }
}

module.exports = { registerUserService, loginUserService };
