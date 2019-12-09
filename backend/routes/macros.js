const router = require('express').Router();
let Macros = require('../models/macros.model');

//Admin and Client: Get all entries for one user
router.route('/macros-log/:id').get((req, res) => {});

//Client: Add daily macros
router.route('/macros-log').post((req, res) => {
	const data = req.body;

	const entryDate = data.date === undefined ? new Date() : data.date;

	const macrosEntry = {
		user: data.user,
		date: entryDate,
		carbs: data.carbs,
		protein: data.protein,
		fat: data.fat,
		fiber: data.fiber,
	};

	const newEntry = new Macros(macrosEntry);

	newEntry
		.save()
		.then(() => res.json('Daily macros added'))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
