const { News } = require('../../models');
const { BAD_REQUEST_MESSAGE } = require('../../constants/responseMessages');
const { BAD_REQUEST, CREATED } = require('../../constants/responseStatuses');

module.exports = {
  async addNews(req, res) {
    try {
      const {
        body:
          {
            title,
            content,
            tags,
          },
        user: {
          id,
        },
        file,
      } = req;
      if (!title.trim() || !content.trim() || !tags.trim()) {
        return res.status(BAD_REQUEST).send(BAD_REQUEST_MESSAGE);
      }
      const news = await News.create({
        title,
        content,
        userId: id,
        picture: file ? file?.path.replace('public/', '') : 'defaultImages/News.jpg',
        tags,
      });
      return res.status(CREATED).send(news);
    } catch (error) {
      return res.status(BAD_REQUEST).send(error);
    }
  },
};
