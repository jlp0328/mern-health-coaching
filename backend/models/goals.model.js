const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const goalsSchema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    weekstart: { type: Date, required: true },
    carbs: { type: Number, required: true },
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    calories: { type: Number }
  },
  {
    timestamps: true
  }
);

const Goals = mongoose.model("Goals", goalsSchema);

module.exports = Goals;
