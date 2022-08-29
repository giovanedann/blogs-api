const { Router } = require('express');
const authorization = require('../middlewares/authorization');
const CategoryController = require('../controllers/CategoryController');

const categoryRoutes = Router();

categoryRoutes.get('/categories', authorization, CategoryController.index);
categoryRoutes.post('/categories', authorization, CategoryController.store);
module.exports = categoryRoutes;
