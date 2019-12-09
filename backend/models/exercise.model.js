const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
	{
		user: {
			type: String,
			required: true,
		},
		date: { type: Date, required: true },
		exercise: { type: String, required: true },
		notes: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
