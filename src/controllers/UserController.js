/* eslint-disable max-lines-per-function */
const { User } = require('../database/models');
const validateUserCredentials = require('../helpers/validateUserCredentials');
const generateJwtToken = require('../utils/generateJwtToken');

class UserController {
  static async index(_request, response) {
    const users = await User.findAll();

    return response.status(200).json(users);
  }

  static async show(request, response) {
    const { id } = request.params;

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return response.status(404).json({ message: 'User does not exist' });
    }
    return response.status(200).json(user);
  }

  static async store(request, response) {
    const { displayName, email, password, image } = request.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return response.status(409).json({ message: 'User already registered' });
    }

    const { statusCode, message } = validateUserCredentials({
      displayName,
      email,
      password,
    });
    if (statusCode && message) {
      return response.status(statusCode).json({ message });
    }

    await User.create({ displayName, email, password, image });

    const token = generateJwtToken(email);
    return response.status(201).json({ token });
  }
}

module.exports = UserController;
