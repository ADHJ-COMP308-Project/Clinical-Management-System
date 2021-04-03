const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyReportSchema = new Schema(
  {
    bodyTemprature: {
      type: Number,
      required: "pulse rate is required",
    },
    pulseRate: {
      type: Number,
      required: "pulse rate is required",
    },
    bloodPressure: {
      type: Number,
      required: "pulse rate is required",
    },
    respiratoryRate: {
      type: Number,
      required: "pulse rate is required",
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

mongoose.model("DailyReport", DailyReportSchema);
