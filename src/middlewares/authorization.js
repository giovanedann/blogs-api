const jwt = require('jsonwebtoken');
require('dotenv');
const { User } = require('../database/models');

module.exports = async (request, response) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: 'Token not found' });
  }

  try {
    const { data } = jwt.verify(authorization, process.env.JWT_SECRET);

    const userExists = await User.findOne({ where: { email: data } });

    if (userExists) {
      return response.status(200).json({ message: 'authorizated' });
    }
  } catch (e) {
    return response.status(401).json({ message: 'Expired or invalid token' });
  }
};
