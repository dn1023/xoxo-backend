module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("tokens", {
    chatid: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return Token;
};
