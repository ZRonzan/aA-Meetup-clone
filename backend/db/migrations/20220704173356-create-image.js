'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uploaderId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      groupId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Groups",
        //   key: "id"
        // },
        onDelete: 'CASCADE'
      },
      venueId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Venues",
        //   key: "id"
        // },
        onDelete: 'CASCADE'
      },
      eventId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Events",
        //   key: "id"
        // },
        onDelete: 'CASCADE'
      },
      imageUrl: {
        type: Sequelize.STRING(5000),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  }
};
