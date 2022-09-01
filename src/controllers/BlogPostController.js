const CategoryService = require('../services/CategoryService');
const UserService = require('../services/UserService');
const BlogPostService = require('../services/BlogPostService');
const PostCategoryService = require('../services/PostCategoryService');

class BlogPostController {
  static async index(_request, response) {
    const posts = await BlogPostService.findAll();
    return response.status(200).json(posts);
  }

  static async show(request, response) {
    const { id } = request.params;

    const post = await BlogPostService.findOne(id);

    if (!post) return response.status(404).json({ message: 'Post does not exist' });

    return response.status(200).json(post);
  }

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

  static async update(request, response) {
    const { id } = request.params;
    const { authorization } = request.headers;
    const { title, content } = request.body;

    const decodedId = await UserService.findUserIdByToken(authorization);
    const postExists = await BlogPostService.findOne(id);

    if (!postExists) return response.status(404).json({ message: 'Post does not exist' });

    if (postExists.userId !== decodedId) {
      return response.status(401).json({ message: 'Unauthorized user' });
    }

    if (!title || !content) {
      return response.status(401).json({ message: 'Some required fields are missing' });
    }

    const updatedPost = await BlogPostService.update(id, title, content);
    
    return response.status(200).json(updatedPost);
  }
}

module.exports = BlogPostController;
