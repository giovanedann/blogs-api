const { PostCategory } = require('../database/models');

class PostCategoryService {
  static async createPostCategory(postId, categoryId) {
    await PostCategory.create({ postId, categoryId });
  }
}

module.exports = PostCategoryService;
