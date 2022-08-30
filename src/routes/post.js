const { Router } = require('express');
const authorization = require('../middlewares/authorization');
const BlogPostController = require('../controllers/BlogPostController');

const blogPostRoutes = Router();

blogPostRoutes.post('/post', authorization, BlogPostController.store);
module.exports = blogPostRoutes;
