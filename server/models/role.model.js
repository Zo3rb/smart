const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      // Define associations
      Role.belongsToMany(models.User, {
        through: "user_roles",
        foreignKey: "role_id",
        otherKey: "user_id",
      });

      Role.belongsToMany(models.Permission, {
        through: "role_permissions",
        foreignKey: "role_id",
        otherKey: "permission_id",
      });
    }
  }

  Role.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
      timestamps: false,
    }
  );

  return Role;
};
