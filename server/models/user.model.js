const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define associations
      User.belongsToMany(models.Role, {
        through: "user_roles",
        foreignKey: "user_id",
        otherKey: "role_id",
      });

      User.belongsToMany(models.Department, {
        through: "user_departments",
        foreignKey: "user_id",
        otherKey: "department_id",
      });

      User.hasMany(models.Department, {
        foreignKey: "manager_user_id",
        as: "managedDepartments",
      });
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      profile_img: {
        type: DataTypes.STRING(255),
        defaultValue: "/uploads/profiles/default-profile.png",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return User;
};
