const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    date: { type: Date, required: true },
    cardiotime: { type: Number, required: true },
    cardiotype: { type: String, required: true },
    addtltraining: { type: String, required: true },
    notes: { type: String, required: false }
  },
  {
    timestamps: true
  }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
