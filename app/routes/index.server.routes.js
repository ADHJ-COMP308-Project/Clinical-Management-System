module.exports = function (app) {
  const index = require("../controllers/index.server.controller");
  const passport = require("passport");

  // index page
  app.route("/").get(index.index);

  // sign up
  app.route("/api/signup").post(index.create);

  // sign in
  app.route("/api/signin").post(
    passport.authenticate("local", {
      successRedirect: "/api/welcome",
      failureRedirect: "/api/error",
      failureFlash: true,
    })
  );
  //
  //
  app.get("/users", index.list);
  app.get("/patients", index.listPatient);
  //
  app.route("/api/read_cookie").get(index.isSignedIn);

  // after success sign in
  app.route("/api/welcome").get(index.welcome);
  // after error sign in
  app.route("/api/error").get(index.error);

  // sign out
  app.route("/api/signout").get(index.signout);

  // Set up the 'users' parameterized routes
  app
    .route("/users/:username")
    .get(index.read)
    .put(index.update)
    .delete(index.delete);
  // Set up the 'username' parameter middleware
  //All param callbacks will be called before any handler of
  //any route in which the param occurs, and they will each
  //be called only once in a request - response cycle,
  //even if the parameter is matched in multiple routes
  app.param("username", index.userByID);
};
