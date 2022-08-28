/* eslint-disable max-lines-per-function */
const { User } = require('../database/models');
const validateUserCredentials = require('../helpers/validateUserCredentials');
const generateJwtToken = require('../utils/generateJwtToken');

class UserController {
  static async store(request, response) {
    const { displayName, email, password, image } = request.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return response.status(409).json({ message: 'User already registered' });
    }

    const { statusCode, message } = validateUserCredentials({ displayName, email, password });

    if (statusCode && message) {
      return response.status(statusCode).json({ message });
    }

    await User.create({ displayName, email, password, image });

    const token = generateJwtToken(email);

    return response.status(201).json({ token });
  }
}

module.exports = UserController;
