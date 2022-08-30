const decodeTokenEmail = require('../utils/decodeTokenEmail');
const { User } = require('../database/models');

class UserService {
  static async findUserIdByToken(jwtToken) {
    const { id } = await User.findOne({ where: { email: decodeTokenEmail(jwtToken) } });
    return id;
  }
}

module.exports = UserService;
