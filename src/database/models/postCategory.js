const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    "PostCategory",
    {
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      tableName: "PostCategories",
    }
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: "categoryId",
      otherKey: "postId",
      as: "posts",
    });

    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: "postId",
      otherKey: "categoryId",
      as: "categories",
    });
  };

  return PostCategory;
};

module.exports = PostCategory;
