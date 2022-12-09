const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

const SALT = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.News, {
        foreignKey: 'userId',
        as: 'news',
      });
    }
  }
  User.init(
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      avatar: { type: DataTypes.STRING },
    },
    User.beforeSave(async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, SALT);
      }
    }),
    User.prototype.comparePassword = function compare(password) {
      return new Promise((res, rej) => {
        bcrypt.compare(password, this.password, (error, isMatch) => {
          if (error) {
            return rej(error);
          }
          return res(isMatch);
        });
      });
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
