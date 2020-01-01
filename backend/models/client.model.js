const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    dob: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    checkinday: { type: String, required: true },
    form: { type: String, required: true },
    monthlycheckin: { type: Number, required: true },
    coach: { type: String, required: true },
    admin: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
);

const Client = mongoose.model("Client", userSchema);

module.exports = Client;
