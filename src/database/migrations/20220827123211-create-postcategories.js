"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PostCategories", {
      categoryId: {
        type: Sequelize.INTEGER,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        allowNull: true,
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
