const CategoryService = require('../services/CategoryService');
const UserService = require('../services/UserService');

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
    return response.status(200).json({ userId });
  }
}

module.exports = BlogPostController;
