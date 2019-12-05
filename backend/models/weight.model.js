const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const weightSchema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    date: { type: Date, required: true },
    weight: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const Weight = mongoose.model("Weight", weightSchema);

module.exports = Weight;
