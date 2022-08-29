const express = require('express');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');

const app = express();
app.use(express.json());

app.use(loginRoutes);
app.use(userRoutes);
app.use(categoryRoutes);

module.exports = app;
