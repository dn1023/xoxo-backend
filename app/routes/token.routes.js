const { verifyPassword } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/token/register",
    [verifyPassword.checkPassword],
    controller.register
  );
  // Update chatid and token
  app.post("/api/token/update",[verifyPassword.checkPassword], controller.update);
  // Update password
  app.get("/api/token/get",[verifyPassword.checkPassword], controller.getData);
  // Get chatid and token
  app.post("/api/token/post", controller.postMessage);
  // Send message
};