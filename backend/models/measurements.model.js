const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const measurementSchema = new Schema(
	{
		user: {
			type: String,
			required: true,
		},
		date: { type: Date, required: true },
		weight: { type: Number, required: true },
		rightarm: { type: Number, required: true },
		rightleg: { type: Number, required: true },
		hips: { type: Number, required: true },
		waist: { type: Number, required: true },
		bust: { type: Number, required: true },
		bodyfat: {
			type: String,
			required: false,
		},
		other: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	},
);

const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
