const { verifyPassword } = require("../middleware");
const controller = require("../controllers/token.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Update chatid and token
  app.post(
    "/api/token/register",
    [verifyPassword.checkPassword],
    controller.registerToken
  );
  // Update password
  app.post("/api/token/update",[verifyPassword.checkPassword], controller.updatePassword);
  // Get chatid and token
  app.get("/api/token/get",[verifyPassword.checkPassword], controller.getData);
  // Send message
  app.post("/api/token/post", controller.postMessage);
  // Token record creation
  app.post("/api/token/create", controller.create);
};