const DailyReport = require("mongoose").model("DailyReport");

const getErrorMessage = function (err) {
  var message = "";
  if (err.code) {
    switch (err.code) {
      default:
        message = "something went wrong";
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

exports.create = function (req, res) {
  var dailyReport = new DailyReport(req.body);
  console.log(dailyReport);
  //dailyReport.owner = req.user._id;
  dailyReport.lastModified = dailyReport.created;

  dailyReport.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json(dailyReport);
    }
  });
};

exports.list = function (req, res) {
  DailyReport.find()
    .sort("-owner")
    .sort("-created")
    .exec((err, dailyReport) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        return res.status(200).json(dailyReport);
      }
    });
};

exports.infoByID = function (req, res, next, id) {
  DailyReport.findById(id).exec((err, dailyReport) => {
    if (err) return next(err);
    if (!dailyReport) return next(new Error("Failed to load daily Info " + id));
    req.dailyReport = dailyReport;
    req.dailyReportId = dailyReport._id;
    next();
  });
};

exports.hasAuthorization = function (req, res, next) {
  if (!req.dailyReport.owner === req.user._id) {
    return res.status(403).send({
      message: "User is not authorized",
    });
  }
  next();
};

exports.read = function (req, res) {
  res.status(200).json(req.dailyReport);
};

exports.update = function (req, res) {
  DailyReport.findByIdAndUpdate(
    { _id: req.dailyReportId },
    req.body,
    function (err, dailyReport) {
      if (err) return next(err);
      res.json(dailyReport);
    }
  );
};

exports.delete = function (req, res) {
  DailyReport.findOneAndRemove(
    { _id: req.dailyReportId },
    req.body,
    function (err, dailyReport) {
      if (err) return next(err);
      res.json(dailyReport);
    }
  );
};
