const { News, User } = require('../models');
const { OK, BAD_REQUEST } = require('../constants/responseStatuses');

module.exports = {
  async getNews(req, res) {
    try {
      const news = await News
        .findAll({
          order: [
            ['id', 'ASC'],
          ],
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'login', 'avatar'],
          }],
        });
      return res.status(OK).send(news);
    } catch {
      return res.status(BAD_REQUEST).send('Error');
    }
  },
};
