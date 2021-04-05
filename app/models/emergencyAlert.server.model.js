const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmergencyAlertSchema = new Schema(
  {
    alertMessage: {
      type: String,
      required: "Message is required",
    },
    unread: {
        type:Boolean,
        default: true
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

EmergencyAlertSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

mongoose.model("EmergencyAlert", EmergencyAlertSchema);
