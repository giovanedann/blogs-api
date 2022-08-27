"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PostCategories", {
      categoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
        references: {
          model: "BlogPosts",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PostCategories");
  },
};
