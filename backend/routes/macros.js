const router = require('express').Router();
let Macros = require('../models/macros.model');

//Admin and Client: Get all entries for one user
router.route('/macros-log/:user').get((req, res) => {
	Macros.find({ user: req.params.user })
		.then(client => res.json(client))
		.catch(err => res.status(400).json('Error: ' + err));
});

//Admin and Client: Get macro entry based on date
router.route('/:user/:date').get((req, res) => {
	const userInfo = req.params;

	Macros.findOne({ user: userInfo.user, date: userInfo.date })
		.then(client => res.json(client))
		.catch(err => res.status(400).json('Error: ' + err));
});

//Client: Add daily macros
router.route('/daily-log').post((req, res) => {
	const newEntry = new Macros(req.body);

	newEntry
		.save()
		.then(() => res.json('Daily macros added'))
		.catch(err => res.status(400).json('Error: ' + err));
});

//Client: Update daily macros
router.route('/update-macros').post((req, res) => {
	let { user, date, protein, carbs, fat, fiber } = req.body;

	Macros.findOneAndUpdate(
		{ user: user, date: date },
		{ protein: protein, carbs: carbs, fat: fat, fiber: fiber },
		{
			new: true,
		},
	)
		.then(client => res.json(client))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
