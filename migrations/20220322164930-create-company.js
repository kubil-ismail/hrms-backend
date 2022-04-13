'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("companies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      desc: {
        type: Sequelize.STRING,
      },
      photo: {
        type: Sequelize.STRING,
        defaultValue: "https://www.btklsby.go.id/images/placeholder/basic.png",
      },
      background: {
        type: Sequelize.STRING,
        defaultValue:
          "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png",
      },
      location: {
        type: Sequelize.STRING,
      },
      industry: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      company_size: {
        type: Sequelize.STRING,
      },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companies');
  }
};