const { Router } = require('express');
const authorization = require('../middlewares/authorization');
const BlogPostController = require('../controllers/BlogPostController');

const blogPostRoutes = Router();

blogPostRoutes.get('/post/search', authorization, BlogPostController.search);
blogPostRoutes.get('/post/:id', authorization, BlogPostController.show);
blogPostRoutes.get('/post', authorization, BlogPostController.index);
blogPostRoutes.put('/post/:id', authorization, BlogPostController.update);
blogPostRoutes.delete('/post/:id', authorization, BlogPostController.delete);
blogPostRoutes.post('/post', authorization, BlogPostController.store);
module.exports = blogPostRoutes;
