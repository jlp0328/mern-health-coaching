const router = require('express').Router();
let Client = require('../models/client.model');

//Get all client info
router.route('/').get((req, res) => {
	Client.find()
		.then(users => res.json(client))
		.catch(err => res.status(400).json('Error: ' + err));
});

//Get one client info
router.route('/client/:id').get((req, res) => {});

//Add new client
router.route('/add-client').post((req, res) => {
	const data = req.body;

	const client = {
		username: data.username,
		firstname: data.firstname,
		lastname: data.lastname,
		dob: data.dob,
		phone: data.phone,
		email: data.email,
		checkinday: data.checkinday,
		monthlycheckin: data.monthlycheckin,
		coach: data.coahch,
	};

	const newClient = new Client({ client });

	newClient
		.save()
		.then(() => res.json('User added!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
