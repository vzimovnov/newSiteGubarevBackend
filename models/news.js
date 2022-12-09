const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  News.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    picture: { type: DataTypes.STRING },
    tags: { type: DataTypes.STRING },
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};
