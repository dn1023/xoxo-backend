const db = require("../models");
const Token = db.token;
var bcrypt = require("bcryptjs");

checkPassword = (req, res, next) => {
  Token.findOne({
      order: [['id', 'DESC']],
      limit: 1
  })
    .then(token => {
      // if (!token) {
      //   return res.status(404).send({ message: "Password not found." });
      // }
      // req.tokenId = token.id;
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        token.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!"
        });
      }
      next();
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


const verifyPassword = {
  checkPassword: checkPassword
}

module.exports = verifyPassword;