/* eslint-disable max-lines-per-function */
const { Category } = require('../database/models');

class CategoryController {
  static async index(_request, response) {
    const categories = await Category.findAll();

    return response.status(200).json(categories);
  }

  static async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ message: '"name" is required' });
    }

    const { id } = await Category.create({ name });

    return response.status(201).json({ id, name });
  }
}

module.exports = CategoryController;
