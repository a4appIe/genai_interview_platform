const userModel = require("./user.model");
const { registerUserService, loginUserService } = require("./user.service");

/**
 * @name registerUserController
 * @description Register new user
 * @access Public
 * @body { username, email, password }
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;
  await registerUserService(res, { username, email, password });
}

/**
 * @name loginUserController
 * @description Login user
 * @access Public
 * @body { email, password }
 */
async function loginUserController(req, res) {
  const { email, password } = req.body;
  await loginUserService(res, { email, password });
}

module.exports = { registerUserController, loginUserController };
