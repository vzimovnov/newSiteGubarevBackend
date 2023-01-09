const { User } = require('../../models');
const { OK, BAD_REQUEST } = require('../../constants/responseStatuses');
const { BAD_REQUEST_MESSAGE, USER_NOT_FOUND, EMPTY_FIELD } = require('../../constants/responseMessages');

module.exports = {
  async updateUser(req, res) {
    try {
      const {
        user: { id },
        body: { login },
        file,
      } = req;
      if (!login.trim() && !file) {
        return res.status(BAD_REQUEST).send(EMPTY_FIELD);
      }
      const user = await User
        .findOne({
          where: { id },
        });
      if (!user) {
        return res.status(BAD_REQUEST).send({ USER_NOT_FOUND });
      }
      const newUser = await user.update({
        login: login || user.login,
        avatar: file?.path.replace('public/', '') || user.avatar,
      });
      return res.status(OK).send(newUser);
    } catch {
      return res.status(BAD_REQUEST).send({ BAD_REQUEST_MESSAGE });
    }
  },
};
