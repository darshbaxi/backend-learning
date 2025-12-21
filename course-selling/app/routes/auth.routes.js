
const {signin,signup} = require("../controllers/auth.controller");
const {checkDupliacteEmail,checkRolesExisted} = require("../middlewares/verifySignup")

modeule.exports = function(app){
    app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/singin',signin);
  app.post('/singup',[checkDupliacteEmail,checkRolesExisted],signup);
}