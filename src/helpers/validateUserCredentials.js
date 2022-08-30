const isEmailValid = require('../utils/isEmailValid');
const validateLength = require('../utils/validateLength');

module.exports = ({ displayName, email, password }) => {
  if (!isEmailValid(email)) {
    return { statusCode: 400, message: '"email" must be a valid email' };
  }

  if (!validateLength(password, 6)) {
    return {
      statusCode: 400,
      message: '"password" length must be at least 6 characters long',
    };
  }

  if (!validateLength(displayName, 8)) {
    return {
      statusCode: 400,
      message: '"displayName" length must be at least 8 characters long',
    };
  }

  return {};
};
