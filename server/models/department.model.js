const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Department extends Model {
    static associate(models) {
      Department.belongsTo(models.User, {
        foreignKey: "manager_user_id",
        as: "manager",
      });

      Department.belongsTo(models.Department, {
        foreignKey: "parent_department_id",
        as: "parentDepartment",
      });

      Department.hasMany(models.Department, {
        foreignKey: "parent_department_id",
        as: "childDepartments",
      });

      Department.belongsToMany(models.User, {
        through: "user_departments",
        foreignKey: "department_id",
        otherKey: "user_id",
      });

      Department.hasMany(models.JournalEntryLine, {
        foreignKey: "department_id",
        as: "journalEntryLines",
      });
    }
  }

  Department.init(
    {
      department_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      manager_user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      parent_department_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "departments",
          key: "department_id",
        },
      },
    },
    {
      sequelize,
      modelName: "Department",
      tableName: "departments",
      timestamps: false,
    }
  );

  return Department;
};
