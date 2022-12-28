const { User, News } = require('../../models');
const { OK, BAD_REQUEST } = require('../../constants/responseStatuses');
const { BAD_REQUEST_MESSAGE, USER_NOT_FOUND } = require('../../constants/responseMessages');

module.exports = {
  async getUser(req, res) {
    try {
      const { params: { id } } = req;
      const user = await User
        .findOne({
          where: { id },
          include: [{
            model: News,
            as: 'news',
          }],
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });
      if (!user) {
        return res.status(BAD_REQUEST).send({ USER_NOT_FOUND });
      }
      return res.status(OK).send(user);
    } catch {
      return res.status(BAD_REQUEST).send(BAD_REQUEST_MESSAGE);
    }
  },
};
