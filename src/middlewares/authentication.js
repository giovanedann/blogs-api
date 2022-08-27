require('dotenv');

const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

module.exports = async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }

  const userExists = await User.findOne({ where: { email } });

  if (!userExists || userExists.password !== password) {
    return response.status(400).json({ message: 'Invalid fields' });
  }

  const token = jwt.sign({ data: email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  response.status(200).json({ token });
  next();
};
