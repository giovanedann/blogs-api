module.exports = (email) => {
  const mailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g; // ref: https://regexr.com/3e48o

  return mailRegexp.test(email);
};
