var express = require("express");
var userRouter = express.Router();

var userController = require("./UserController");
var authController = require("./AuthController");

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.patch("/:id", userController.updateUserById);
userRouter.delete("/:id", userController.deleteUserById);
userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);

userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.patch("/resetPassword/:token", authController.resetPassword);
userRouter.patch(
  "/updateMyPassword/:id",
  authController.protectSystem,
  authController.updatePassword
);
userRouter.patch(
  "/updateMe/:id",
  authController.protectSystem,
  authController.updateMe
);
userRouter.patch(
  "/deleteMe/:id",
  authController.protectSystem,
  authController.deleteMe
);

module.exports = userRouter;
