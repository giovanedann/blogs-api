const { BlogPost, User, Category } = require('../database/models');

class BlogPostService {
  static async findAll() {
    const blogPosts = await BlogPost.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });
    return blogPosts;
  }

  static async findOne(id) {
    const blogPosts = await BlogPost.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });
    return blogPosts;
  }

  static async update(id, title, content) {
    await BlogPost.update(
      { title, content },
      {
        where: { id },
      },
    );
    const updatedPost = await BlogPost.findOne({ where: { id } });
    return updatedPost;
  }

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
