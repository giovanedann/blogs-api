const CategoryService = require('../services/CategoryService');
const UserService = require('../services/UserService');
const BlogPostService = require('../services/BlogPostService');
const PostCategoryService = require('../services/PostCategoryService');

class BlogPostController {
  static async store(request, response) {
    const { title, content, categoryIds } = request.body;
    const { authorization } = request.headers;
    
    if ([title, content, categoryIds].some((item) => !item) || !categoryIds.length) {
      return response.status(400).json({ message: 'Some required fields are missing' });
    }
    
    const { message } = await CategoryService.checkCategoriesExistence(categoryIds);
    if (message) return response.status(400).json({ message });

    const userId = await UserService.findUserIdByToken(authorization);
    const postData = await BlogPostService.createPost({ title, content, userId });

    await Promise.all(categoryIds.map(async (categoryId) => {
      await PostCategoryService.createPostCategory(postData.id, categoryId);
    }));

    return response.status(201).json(postData);
  }
}

module.exports = BlogPostController;
