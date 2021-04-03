const mongoose = require("mongoose");

const DailyReport = mongoose.model("DailyReport");
const User = mongoose.model("User");

//
function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return "Unknown server error";
  }
}

exports.create = function(req, res) {
  console.log("In Create");
  const dailyReport = new DailyReport();
  dailyReport.bodyTemprature = req.body.bodyTemprature;
  dailyReport.pulseRate = req.body.pulseRate;
  dailyReport.bloodPressure = req.body.bloodPressure;
  dailyReport.respiratoryRate = req.body.respiratoryRate;

  var usr = new User();
  console.log("req.body: " + req.body.patient);

  User.findOne({ username: req.body.patient }, (err, user) => {
    if (err) {
      return getErrorMessage(err);
    }
    if (!user) {
      return next("No user found");
    }
    console.log("user found: " + user);
    usr._id = user._id;
    //req._id = user._id;
  }).then(function() {
    dailyReport.patient = usr._id;

    console.log("dailyReport.patient: " + dailyReport.patient);

    dailyReport.save(err => {
      if (err) {
        return res.status(400).send({ message: getErrorMessage(err) });
      } else {
        res.status(200).json(dailyReport);
      }
    });
  });
};

exports.list = function(req, res) {
  DailyReport.find()
    .sort("-patient")
    .sort("-createdAt")
    .exec((err, dailyReport) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        console.log(dailyReport);
        return res.status(200).json(dailyReport);
      }
    });
};

exports.infoByID = function(req, res, next, id) {
  DailyReport.findById(id).exec((err, dailyReport) => {
    if (err) return next(err);
    if (!dailyReport) return next(new Error("Failed to load daily Info " + id));
    req.dailyReport = dailyReport;
    req.dailyReportId = dailyReport._id;
    next();
  });
};

exports.hasAuthorization = function(req, res, next) {
  if (!req.dailyReport.patient === req.user._id) {
    return res.status(403).send({
      message: "User is not authorized"
    });
  }
  next();
};

exports.read = function(req, res) {
  res.status(200).json(req.dailyReport);
};

exports.update = function(req, res) {
  DailyReport.findOneAndUpdate({ _id: req.dailyReportId }, req.body, function(
    err,
    dailyReport
  ) {
    if (err) return next(err);
    res.json(dailyReport);
  });
};

exports.delete = function(req, res) {
  DailyReport.findOneAndRemove({ _id: req.dailyReportId }, req.body, function(
    err,
    dailyReport
  ) {
    if (err) return next(err);
    res.json(dailyReport);
  });
};
