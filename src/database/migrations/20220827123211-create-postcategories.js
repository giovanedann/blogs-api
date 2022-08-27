"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("postcategories", {
      categoryId: {
        type: Sequelize.INTEGER,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        allowNull: true,
        primaryKey: true,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      postId: {
        type: Sequelize.INTEGER,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        allowNull: true,
        primaryKey: true,
        references: {
          model: "BlogPosts",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("postcategories");
  },
};
