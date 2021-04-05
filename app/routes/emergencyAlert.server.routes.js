const users = require('../controllers/users.server.controller');
const emergencyAlert = require('../controllers/emergencyAlert.server.controller');

module.exports =function(app){

    app.route('/api/emergencyAlerts')
    .post(
        // users.requiresLogin,
        // users.isSignedIn,
        emergencyAlert.create);

    app.route('/api/emergencyAlerts').get(emergencyAlert.list);

    // app.route('/api/emergencyAlert/users/:patientId').get(emergencyAlert.read);
    
    // app.route('/api/emergencyAlert/latest/users/:latestReportPatientId').get(emergencyAlert.read);

    app.route('/api/emergencyAlerts/:emergencyAlertId')
    .get(emergencyAlert.read)
    .put(
        // users.requiresLogin,
        // emergencyAlert.hasAuthorization,
        emergencyAlert.update)
        .delete(
            // users.requiresLogin,
            // emergencyAlert.hasAuthorization,
            emergencyAlert.delete);

            app.param('emergencyAlertId',emergencyAlert.infoByID);
            // app.param('patientId',emergencyAlert.reportsOfPatient);
            // app.param('latestReportPatientId',emergencyAlert.latestReportOfPatient);
        
};