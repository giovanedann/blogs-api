const { Router } = require('express');
const UserController = require('../controllers/UserController');
const authorization = require('../middlewares/authorization');

const userRoutes = Router();

userRoutes.get('/user/:id', authorization, UserController.show);
userRoutes.get('/user', authorization, UserController.index);
userRoutes.post('/user', UserController.store);

module.exports = userRoutes;
