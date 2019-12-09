const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//Admin and Client: Get all entries for one user
router.route('/exercise-log/:id').get((req, res) => {});

//Client: Add daily macros
router.route('/exercise-log').post((req, res) => {
	const data = req.body;

	const entryDate = data.date === undefined ? new Date() : data.date;

	const exerciseEntry = {
		user: data.user,
		date: entryDate,
		exercise: data.exercise,
		notes: data.notes,
	};

	const newEntry = new Exercise(exerciseEntry);

	newEntry
		.save()
		.then(() => res.json('Daily exercise added'))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
