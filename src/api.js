const express = require('express');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());

app.use(loginRoutes);
app.use(userRoutes);

module.exports = app;
