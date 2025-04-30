const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        through: "role_permissions",
        foreignKey: "permission_id",
        otherKey: "role_id",
      });
    }
  }

  Permission.init(
    {
      permission_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      permission_name: {
        type: DataTypes.STRING(100),
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
      modelName: "Permission",
      tableName: "permissions",
      timestamps: false,
    }
  );

  return Permission;
};
