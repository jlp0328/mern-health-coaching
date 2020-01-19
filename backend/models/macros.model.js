const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const macroSchema = new Schema(
	{
		user: {
			type: String,
			required: true,
		},
		date: { type: Date, required: true },
		startofweek: { type: Date, required: true },
		carbs: { type: Number, required: true },
		protein: { type: Number, required: true },
		fat: { type: Number, required: true },
		fiber: { type: Number, required: true },
	},
	{
		timestamps: true,
	},
);

const Macros = mongoose.model('Macros', macroSchema);

module.exports = Macros;
