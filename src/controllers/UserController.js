/* eslint-disable max-lines-per-function */
const { User } = require('../database/models');
const validateUserCredentials = require('../helpers/validateUserCredentials');
const generateJwtToken = require('../utils/generateJwtToken');
const UserService = require('../services/UserService');

class UserController {
  static async index(_request, response) {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    return response.status(200).json(users);
  }

  static async show(request, response) {
    const { id } = request.params;

    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
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

  static async deactivate(request, response) {
    const { authorization } = request.headers;

    await UserService.deactivate(authorization);

    response.sendStatus(204);
  }
}

module.exports = UserController;
