const express = require("express");
const { signUp, signIn } = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.post("/register", signUp);

userRouter.post("/login", signIn);

module.exports = userRouter;
