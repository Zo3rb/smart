const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../models");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

/**
 * Middleware to protect routes - verify user is authenticated
 */
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access.", 401)
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await db.User.findByPk(decoded.id, {
      include: {
        model: db.Role,
        through: { attributes: [] },
        include: {
          model: db.Permission,
          through: { attributes: [] },
        },
      },
    });

    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token no longer exists.", 401)
      );
    }

    if (!currentUser.is_active) {
      return next(new AppError("This user account has been deactivated.", 401));
    }

    // Compile user permissions
    const permissions = [];
    currentUser.Roles.forEach((role) => {
      role.Permissions.forEach((permission) => {
        if (!permissions.includes(permission.permission_name)) {
          permissions.push(permission.permission_name);
        }
      });
    });

    // Add user and permissions to request
    req.user = {
      id: currentUser.user_id,
      username: currentUser.username,
      email: currentUser.email,
      firstName: currentUser.first_name,
      lastName: currentUser.last_name,
      roles: currentUser.Roles.map((role) => role.role_name),
      permissions,
    };

    next();
  } catch (error) {
    return next(
      new AppError("Invalid token or token expired. Please log in again.", 401)
    );
  }
});

/**
 * Middleware to restrict routes to specific roles
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user.roles.some((role) => roles.includes(role))) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

/**
 * Middleware to restrict routes based on specific permissions
 */
exports.hasPermission = (...requiredPermissions) => {
  return (req, res, next) => {
    // Check if user has at least one of the required permissions
    const hasRequiredPermission = requiredPermissions.some((permission) =>
      req.user.permissions.includes(permission)
    );

    if (!hasRequiredPermission) {
      return next(
        new AppError(
          "You do not have the necessary permission to perform this action",
          403
        )
      );
    }

    next();
  };
};
