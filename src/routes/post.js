const { Router } = require('express');
const authorization = require('../middlewares/authorization');
const BlogPostController = require('../controllers/BlogPostController');

const blogPostRoutes = Router();

blogPostRoutes.get('/post/:id', authorization, BlogPostController.show);
blogPostRoutes.get('/post', authorization, BlogPostController.index);
blogPostRoutes.post('/post', authorization, BlogPostController.store);
module.exports = blogPostRoutes;
