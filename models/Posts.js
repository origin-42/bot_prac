const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projects_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'projects',
            key: 'id',
          },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
          },
      },
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'posts',
    }
  );

module.exports = Posts