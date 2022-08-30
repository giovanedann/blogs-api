const { BlogPost } = require('../database/models');

class BlogPostService {
  static async createPost({ title, content, userId }) {
    const postData = await BlogPost.create({
      title,
      content,
      userId,
      updated: new Date(),
      published: new Date(),
    });

    return postData;
  }
}

module.exports = BlogPostService;
