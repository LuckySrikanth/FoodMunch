const express = require("express");

const userRouter = express.Router();
const {
  getAllUsers,
  postUser,
  loginUser,
} = require("../Controllers/userController");

userRouter.get("/allUsers", getAllUsers);
userRouter.post("/postUser", postUser);
userRouter.post("/loginUser", loginUser);

module.exports = userRouter;
