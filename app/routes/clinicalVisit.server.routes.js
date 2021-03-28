var ClinicalVisit = require("../controllers/clinicalVisit.server.controller");
var index = require("../controllers/index.server.controller");

module.exports = function (app) {
  // create ClinicalVisit
  app
    .route("/api/clinicalVisit/create")
    .post(index.requiresLogin, index.isNurse, ClinicalVisit.create);

  // to show a list of ClinicalVisit
  app.route("/api/clinicalVisits").get(ClinicalVisit.list);

  // read, update, delete ClinicalVisit by Clinical Visit Id
  app
    .route("/api/clinicalVisit/:clinicalVisitId")
    .get(ClinicalVisit.read)
    .put(
      index.requiresLogin,
      ClinicalVisit.hasAuthorization,
      ClinicalVisit.update
    )
    .delete(
      index.requiresLogin,
      ClinicalVisit.hasAuthorization,
      ClinicalVisit.delete
    );
  app.param("clinicalVisitId", ClinicalVisit.infoByID);
};
