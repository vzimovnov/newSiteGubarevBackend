const { Op } = require('sequelize');

const { User } = require('../../models');
const { generateToken } = require('../../utils/tokenGeneration');
const {
  EMPTY_FIELD,
  ALREADY_EXIST,
  WRONG_PASSWORD,
  USER_NOT_FOUND,
} = require('../../constants/responseMessages');
const {
  BAD_REQUEST,
  OK,
} = require('../../constants/responseStatuses');

module.exports = {
  async register(req, res) {
    try {
      const {
        body: {
          login,
          password,
          name,
          email,
        },
      } = req;
      const payload = {
        login: login?.trim(),
        password,
        name: name?.trim(),
        email: email?.trim(),
      };
      if (!payload.login
          || !password
          || !payload.name
          || !payload.email) {
        return res.status(BAD_REQUEST).send(EMPTY_FIELD);
      }
      const candidate = await User.findOne(
        {
          where: {
            [Op.or]: [{ email }, { login }],
          },
        },
      );
      if (candidate) {
        return res.status(BAD_REQUEST).send(ALREADY_EXIST);
      }
      const user = await User.create(payload);
      const token = generateToken(user.id);
      return res.status(OK).json({
        token,
        user: {
          id: user.id,
          login: user.login,
        },
      });
    } catch (error) {
      return res.status(BAD_REQUEST).send(error);
    }
  },

  async login(req, res) {
    try {
      const {
        body: {
          login,
          password,
        },
      } = req;
      if (!login.trim() || !password.trim()) {
        return res.status(BAD_REQUEST).send(EMPTY_FIELD);
      }
      const user = await User.findOne({ where: { login } });
      if (!user) {
        return res.status(BAD_REQUEST).send(USER_NOT_FOUND);
      }
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res.status(BAD_REQUEST).send(WRONG_PASSWORD);
      }
      const token = generateToken(user.id);
      return res.status(OK).json({
        token,
        user: {
          id: user.id,
          login: user.login,
        },
      });
    } catch (error) {
      return res.status(BAD_REQUEST).send(error);
    }
  },

  async whoAmI(req, res) {
    const { user: { id, login } } = req;
    return res.status(OK).send({
      id,
      login,
    });
  },
};
