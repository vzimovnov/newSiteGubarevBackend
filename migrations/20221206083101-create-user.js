module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      avatar: { type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
