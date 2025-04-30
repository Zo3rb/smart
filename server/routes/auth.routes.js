const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authValidator = require("../validators/auth.validator");

const router = express.Router();

// Public Routes
router.post("/login", authValidator.validateLogin, authController.login);
router.post(
  "/refresh-token",
  authValidator.validateRefreshToken,
  authController.refreshToken
);
router.post(
  "/forgot-password",
  authValidator.validateForgotPassword,
  authController.forgotPassword
);
router.post(
  "/reset-password/:token",
  authValidator.validateResetPassword,
  authController.resetPassword
);

// Protected Routes
router.use(authMiddleware.protect);
router.get("/profile", authController.getProfile);
router.post(
  "/change-password",
  authValidator.validateChangePassword,
  authController.changePassword
);
router.post("/logout", authController.logout);

module.exports = router;
