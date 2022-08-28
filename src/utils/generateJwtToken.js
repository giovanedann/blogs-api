require('dotenv');
const jwt = require('jsonwebtoken');

module.exports = (email) => {
  const token = jwt.sign({ data: email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  return token;
};
