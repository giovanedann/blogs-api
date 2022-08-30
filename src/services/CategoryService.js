const { Category } = require('../database/models');

class CategoryService {
  static async checkCategoriesExistence(categoryIds) {
    const categoriesExist = await Promise.all(
      categoryIds.map(async (categoryId) => {
        const categoryExist = await Category.findOne({ where: { id: categoryId } });
        return categoryExist;
      }),
    );

    if (categoriesExist.some((queryResult) => !queryResult)) {
      return ({ message: '"categoryIds" not found' });
    }

    return {};
  }
}

module.exports = CategoryService;
