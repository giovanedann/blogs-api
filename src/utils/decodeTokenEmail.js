require('dotenv');
const jwt = require('jsonwebtoken');

module.exports = (token) => {
  const { data } = jwt.verify(token, process.env.JWT_SECRET);

  return data;
};
