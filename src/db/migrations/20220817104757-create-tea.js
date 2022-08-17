module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      x: {
        type: Sequelize.FLOAT,
      },
      y: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teas');
  },
};
