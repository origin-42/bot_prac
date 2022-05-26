const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Projects extends Model {}

Projects.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
          },
      }
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'projects',
    }
  );

  module.exports = Projects