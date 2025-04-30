const authService = require("../services/auth.service");
const emailService = require("../utils/emailService");
const logger = require("../utils/logger");
const catchAsync = require("../utils/catchAsync");

/**
 * Login controller
 */
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // Authenticate user
  const result = await authService.login(username, password);

  // Log successful login
  logger.info(`User ${result.user.username} logged in`, {
    metadata: { userId: result.user.id },
  });

  res.status(200).json({
    status: "success",
    data: result,
  });
});

/**
 * Refresh token controller
 */
exports.refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  const result = await authService.refreshToken(refreshToken);

  res.status(200).json({
    status: "success",
    data: result,
  });
});

/**
 * Forgot password controller
 */
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // Create password reset token
  const result = await authService.createPasswordResetToken(email);

  // For security, we return the same response regardless of whether
  // the email exists in our system or not
  if (!result) {
    return res.status(200).json({
      status: "success",
      message:
        "If a user with that email exists, a password reset link will be sent.",
    });
  }

  const { user, resetToken } = result;

  // Create reset URL
  const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  try {
    // Send email with reset token
    await emailService.sendPasswordResetEmail(
      user.email,
      user.first_name,
      resetURL
    );

    logger.info(`Password reset email sent to ${user.email}`, {
      metadata: { userId: user.user_id },
    });

    res.status(200).json({
      status: "success",
      message:
        "If a user with that email exists, a password reset link will be sent.",
    });
  } catch (error) {
    // Reset the token fields in case of email sending error
    await user.update({
      reset_password_token: null,
      reset_password_expires: null,
    });

    logger.error("Error sending password reset email", {
      metadata: {
        userId: user.user_id,
        error: error.message,
      },
    });

    return next(
      new AppError(
        "There was an error sending the email. Please try again later.",
        500
      )
    );
  }
});

/**
 * Reset password controller
 */
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await authService.resetPassword(token, password);

  logger.info(`Password reset successful for user ${user.username}`, {
    metadata: { userId: user.user_id },
  });

  res.status(200).json({
    status: "success",
    message: "Password has been reset successfully",
  });
});

/**
 * Change password controller
 */
exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  const user = await authService.changePassword(
    userId,
    currentPassword,
    newPassword
  );

  logger.info(`Password changed for user ${user.username}`, {
    metadata: { userId: user.user_id },
  });

  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
});

/**
 * Get user profile controller
 */
exports.getProfile = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const userProfile = await authService.getUserProfile(userId);

  res.status(200).json({
    status: "success",
    data: {
      user: userProfile,
    },
  });
});

/**
 * Logout controller (primarily for logging)
 */
exports.logout = (req, res) => {
  logger.info(`User logged out`, {
    metadata: { userId: req.user?.id },
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
