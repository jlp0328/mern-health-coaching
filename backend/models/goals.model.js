const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalsSchema = new Schema(
	{
		user: {
			type: String,
			required: true,
		},
		startofweek: { type: Date, required: true },
		carbsgoal: { type: Number, required: true },
		proteingoal: { type: Number, required: true },
		fatgoal: { type: Number, required: true },
		caloriesgoal: { type: Number },
	},
	{
		timestamps: true,
	},
);

const Goals = mongoose.model('Goals', goalsSchema);

module.exports = Goals;
