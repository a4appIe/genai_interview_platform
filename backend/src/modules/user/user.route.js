const { Router } = require("express");
const userController = require("./user.controller");
const userRouter = Router();

/**
 * @route POST /api/user/register
 * @description Register new user
 * @access Public
 */
userRouter.post("/register", userController.registerUserController);

/**
 * @route POST /api/user/login
 * @description Login user
 * @access Public
 */
userRouter.post("/login", userController.loginUserController);

module.exports = userRouter;