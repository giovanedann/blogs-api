const { Router } = require('express');
const UserController = require('../controllers/UserController');
// const authorization = require('../middlewares/authorization');

const userRoutes = Router();

userRoutes.post('/user', UserController.store);

module.exports = userRoutes;
