import { Router } from "express";
import authController from "../controllers/user.controller.js";

import registerValidator from "../validators/register.validator.js";
import loginValidator from "../validators/login.validator.js";

import resetPassword from "../validators/resetPassword.validator.js";
import isLoggedIn from "../middlewares/isLoggedin.js";
import jwtAuth from "../../middlewares/jwtAuth.middlewares.js";

const authRouter = Router();

// /api/users

authRouter.get("/", authController.getAllUsers)

authRouter.post(
  "/register",
  registerValidator,
  isLoggedIn,

  authController.postRegister
);

authRouter.post("/login", isLoggedIn, loginValidator, authController.postLogin);

// note: important do not use get method to logout
authRouter.post("/logout", authController.postLogoutUser);

authRouter.patch("/update", jwtAuth, authController.postUpdateUser);

authRouter.post(
  "/request-reset-password",
  authController.postRequestResetPassword
);

authRouter.get("/token-validate", authController.getResetPasswordTokenValidity);

authRouter.patch(
  "/reset-password",
  resetPassword,
  authController.postResetPassword
);

authRouter.delete("/delete-user", jwtAuth, authController.postDeleteUser);

export default authRouter;
