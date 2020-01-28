const router = require('express').Router();
let Measurements = require('../models/measurements.model');

//Admin and Client: Get all entries for one user
router.route('/measurements-log/:user').get((req, res) => {
	Measurements.find({ user: req.params.user })
		.then(client => res.json(client))
		.catch(err => res.status(400).json('Error: ' + err));
});

//Admin and Client: Get measurement entry based on date
router.route('/:user/:date').get((req, res) => {
	const userInfo = req.params;

	Measurements.findOne({ user: userInfo.user, date: userInfo.date })
		.then(client => res.json(client))
		.catch(err => res.status(400).json('Error: ' + err));
});

//Client: Add monthly measurements
router.route('/monthly-log').post((req, res) => {
	const newEntry = new Measurements(req.body);

	newEntry
		.save()
		.then(() => res.json('Monthly measurements added'))
		.catch(err => res.status(400).json('Error: ' + err));
});

//Client: Update monthly measurements
router.route('/update-measurements').post((req, res) => {
	let {
		user,
		date,
		weight,
		rightarm,
		rightleg,
		hips,
		waist,
		bust,
		bodyfat,
		other,
	} = req.body;

	Measurements.findOneAndUpdate(
		{ user: user, date: date },
		{
			weight: weight,
			rightarm: rightarm,
			rightleg: rightleg,
			hips: hips,
			waist: waist,
			bust: bust,
			bodyfat: bodyfat,
			other: other,
		},
		{
			new: true,
		},
	)
		.then(client => res.json(client))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
