const Joi = require("joi");

// Login validation schema
const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username or email is required",
    "any.required": "Username or email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

// Refresh token validation schema
const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "string.empty": "Refresh token is required",
    "any.required": "Refresh token is required",
  }),
});

// Forgot password validation schema
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
});

// Reset password validation schema
const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Token is required",
    "any.required": "Token is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "string.empty": "Password confirmation is required",
    "any.required": "Password confirmation is required",
  }),
});

// Change password validation schema
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "string.empty": "Current password is required",
    "any.required": "Current password is required",
  }),
  newPassword: Joi.string().min(8).required().messages({
    "string.min": "New password must be at least 8 characters long",
    "string.empty": "New password is required",
    "any.required": "New password is required",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "string.empty": "Password confirmation is required",
      "any.required": "Password confirmation is required",
    }),
});

// Validate login request
const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message,
    });
  }
  next();
};

// Validate refresh token request
const validateRefreshToken = (req, res, next) => {
  const { error } = refreshTokenSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message,
    });
  }
  next();
};

// Validate forgot password request
const validateForgotPassword = (req, res, next) => {
  const { error } = forgotPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message,
    });
  }
  next();
};

// Validate reset password request
const validateResetPassword = (req, res, next) => {
  const validationObj = {
    token: req.params.token,
    ...req.body,
  };
  const { error } = resetPasswordSchema.validate(validationObj);
  if (error) {
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message,
    });
  }
  next();
};

// Validate change password request
const validateChangePassword = (req, res, next) => {
  const { error } = changePasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = {
  validateLogin,
  validateRefreshToken,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword,
};
