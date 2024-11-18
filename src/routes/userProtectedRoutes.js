const express = require("express");
const userAuthRouter = express.Router();

const { getUserDetails } = require("../controllers/protectedRouteControllers");
const auth = require("../middlewares/auth");

userAuthRouter.get("/", auth, getUserDetails);

module.exports = userAuthRouter;
