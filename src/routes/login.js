const { Router } = require('express');
const authentication = require('../middlewares/authentication');

const loginRoutes = Router();

loginRoutes.post('/login', authentication);

module.exports = loginRoutes;
