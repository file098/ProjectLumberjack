const controller = require("../controllers/session.controller");

module.exports = function (app) {
  app.post("/api/session/addHandy", controller.addHandy);

  app.get("/api/session/total", controller.totalHandy);

  app.get("/api/session/userHandy", controller.userHandy);

  app.get("/api/session/scoreboard", controller.scoreboard);
};
