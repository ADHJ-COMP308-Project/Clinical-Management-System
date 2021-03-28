var DailyReport = require("../controllers/dailyReport.server.controller");
var index = require("../controllers/index.server.controller");

module.exports = function (app) {
  // create dailyReport
  app
    .route("/api/dailyReport/create")
    .post(index.requiresLogin, index.isPatient, DailyReport.create);

  // to show a list of dailyReport
  app.route("/api/dailyReports").get(DailyReport.list);

  // read, update, delete dailyReport by dailyReport Id
  app
    .route("/api/dailyReport/:dailyReportId")
    .get(DailyReport.read)
    .put(index.requiresLogin, DailyReport.hasAuthorization, DailyReport.update)
    .delete(index.requiresLogin, DailyReport.hasAuthorization, DailyReport.delete);
  app.param("dailyReportId", DailyReport.infoByID);
};
