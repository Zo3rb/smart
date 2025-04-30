const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op } = require("sequelize");
const db = require("../models");
const AppError = require("../utils/AppError");

class AuthService {
  /**
   * Generate JWT access token
   * @param {Object} user - User object
   * @returns {String} JWT token
   */
  generateAccessToken(user) {
    return jwt.sign(
      {
        id: user.user_id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );
  }

  /**
   * Generate refresh token
   * @param {Object} user - User object
   * @returns {String} Refresh token
   */
  generateRefreshToken(user) {
    return jwt.sign({ id: user.user_id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || "7d",
    });
  }

  /**
   * Authenticate a user with username/email and password
   * @param {String} username - Username or email
   * @param {String} password - Password
   * @returns {Object} User data and tokens
   */
  async login(username, password) {
    // Find user
    const user = await db.User.findOne({
      where: {
        [Op.or]: [{ username }, { email: username }],
        is_active: true,
      },
      include: [
        {
          model: db.Role,
          through: { attributes: [] },
          include: [
            {
              model: db.Permission,
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    // Verify user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new AppError("Invalid credentials", 401);
    }

    // Generate tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Compile user permissions
    const permissions = [];
    user.Roles.forEach((role) => {
      role.Permissions.forEach((permission) => {
        if (!permissions.includes(permission.permission_name)) {
          permissions.push(permission.permission_name);
        }
      });
    });

    // Return user data and tokens
    return {
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        profileImage: user.profile_img,
        roles: user.Roles.map((role) => role.role_name),
        permissions,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh access token using refresh token
   * @param {String} refreshToken - Refresh token
   * @returns {Object} New access token and user data
   */
  async refreshToken(refreshToken) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      // Find user
      const user = await db.User.findByPk(decoded.id, {
        include: [
          {
            model: db.Role,
            through: { attributes: [] },
            include: [
              {
                model: db.Permission,
                through: { attributes: [] },
              },
            ],
          },
        ],
      });

      if (!user || !user.is_active) {
        throw new AppError("Invalid refresh token or user inactive", 401);
      }

      // Generate new access token
      const accessToken = this.generateAccessToken(user);

      // Compile user permissions
      const permissions = [];
      user.Roles.forEach((role) => {
        role.Permissions.forEach((permission) => {
          if (!permissions.includes(permission.permission_name)) {
            permissions.push(permission.permission_name);
          }
        });
      });

      return {
        accessToken,
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          profileImage: user.profile_img,
          roles: user.Roles.map((role) => role.role_name),
          permissions,
        },
      };
    } catch (error) {
      throw new AppError("Invalid or expired refresh token", 401);
    }
  }

  /**
   * Create password reset token for user
   * @param {String} email - User email
   * @returns {Object} Reset token and user data
   */
  async createPasswordResetToken(email) {
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      // We don't throw an error for security reasons
      // Just return null which controller will handle
      return null;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token for storage
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expiration (10 minutes)
    const resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Save to database
    await user.update({
      reset_password_token: resetPasswordToken,
      reset_password_expires: resetPasswordExpires,
    });

    return {
      user,
      resetToken,
    };
  }

  /**
   * Reset user password using token
   * @param {String} token - Plain reset token
   * @param {String} newPassword - New password
   * @returns {Object} User object
   */
  async resetPassword(token, newPassword) {
    // Hash the token to compare with stored hash
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with valid token
    const user = await db.User.findOne({
      where: {
        reset_password_token: hashedToken,
        reset_password_expires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      throw new AppError("Token is invalid or has expired", 400);
    }

    // Hash the new password
    const passwordHash = await bcrypt.hash(
      newPassword,
      parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10
    );

    // Update user with new password and clear reset token
    await user.update({
      password_hash: passwordHash,
      reset_password_token: null,
      reset_password_expires: null,
    });

    return user;
  }

  /**
   * Change user password (for logged in users)
   * @param {Number} userId - User ID
   * @param {String} currentPassword - Current password
   * @param {String} newPassword - New password
   * @returns {Object} User object
   */
  async changePassword(userId, currentPassword, newPassword) {
    // Get user
    const user = await db.User.findByPk(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Check if current password is correct
    if (!(await bcrypt.compare(currentPassword, user.password_hash))) {
      throw new AppError("Current password is incorrect", 401);
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(
      newPassword,
      parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10
    );

    // Update user
    await user.update({
      password_hash: passwordHash,
    });

    return user;
  }

  /**
   * Get user profile
   * @param {Number} userId - User ID
   * @returns {Object} User profile data
   */
  async getUserProfile(userId) {
    const user = await db.User.findByPk(userId, {
      include: [
        {
          model: db.Role,
          through: { attributes: [] },
          include: [
            {
              model: db.Permission,
              through: { attributes: [] },
            },
          ],
        },
      ],
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Compile permissions
    const permissions = [];
    user.Roles.forEach((role) => {
      role.Permissions.forEach((permission) => {
        if (!permissions.includes(permission.permission_name)) {
          permissions.push(permission.permission_name);
        }
      });
    });

    return {
      id: user.user_id,
      username: user.username,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      profileImage: user.profile_img,
      isActive: user.is_active,
      roles: user.Roles.map((role) => role.role_name),
      permissions,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }
}

module.exports = new AuthService();
