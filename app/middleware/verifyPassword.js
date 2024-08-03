const db = require("../models");
const Token = db.token;

checkPassword = (req, res, next) => {
  Token.findOne({
    where: {
      password: bcrypt.hashSync(req.body.password, 8)
    }
  })
    .then(token => {
      if (!token) {
        return res.status(404).send({ message: "Password not found." });
      }
      req.tokenId = token.id;
      next();
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};