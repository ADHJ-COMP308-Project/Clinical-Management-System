const users = require('../controllers/users.server.controller');
const dailyReport = require('../controllers/dailyReport.server.controller');

module.exports =function(app){

    app.route('/api/dailyReports')
    .post(
        // users.requiresLogin,
        // users.isSignedIn,
        dailyReport.create);

    app.route('/api/dailyReports').get(dailyReport.list);

    app.route('/api/dailyReports/:dailyReportId')
    .get(dailyReport.read)
    .put(
        // users.requiresLogin,
        // dailyReport.hasAuthorization,
        dailyReport.update)
        .delete(
            // users.requiresLogin,
            // dailyReport.hasAuthorization,
            dailyReport.delete);

            app.param('dailyReportId',dailyReport.infoByID);
        
};