const decodeTokenEmail = require('../utils/decodeTokenEmail');
const { User } = require('../database/models');

class UserService {
  static async findUserIdByToken(jwtToken) {
    const { id } = await User.findOne({ where: { email: decodeTokenEmail(jwtToken) } });
    return id;
  }

  static async deactivate(jwtToken) {
    const userId = await this.findUserIdByToken(jwtToken);
    await User.destroy({ where: { id: userId } });
  }
}

module.exports = UserService;
