const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Requiring routers */
const userRouter = require("./modules/user/user.route");
const { sendResponse } = require("./utils/response");

/** Using router middlewares */
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  sendResponse(res, 200, `System is active`);
});

module.exports = app;
