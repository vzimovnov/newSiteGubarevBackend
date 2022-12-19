const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const user = require('../../models/user');

const generateToken = (id) => `${jwt.sign(id, process.env.SECRET)}`;

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
        login: login.trim(),
        password,
        name: name.trim(),
        email: email.trim(),
      };
      if (!payload.login
          || !password
          || !payload.name
          || !payload.email) {
        return res.status(400).send('Передумай');
      }
      const kekUser = await User.findOne(
        {
          where: {
            [Op.or]: [{ email }, { login }],
          },
        },
      );
      if (kekUser) {
        res.status(401).send('Такой уже есть, не надо');
      }
      const user = await User.create(payload);
      const token = generateToken(user.id);
      return res.status(200).json({
        token,
        user: {
          id: user.id,
          login: user.login,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async login(req, res) {
    try {
      const {
        body: {
          email,
          password,
        },
      } = req;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status().send();
      }
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res.status(400).send('Придержи коней');
      }
      const token = generateToken(user.id);
      return res.status(200).json({
        token: `Bearer ${token}`,
        user: {
          id: user.id,
          login: user.login,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async whoAmI(req, res) {
    const { user: { id, login } } = req;
    return res.status(200).send({
      id,
      login,
    });
  },
};
