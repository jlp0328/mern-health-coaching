const router = require('express').Router();
let Client = require('../models/client.model');

//Get all client info
router.route('/clients').get((req, res) => {});

//Get one client info
router.route('/client/:id').get((req, res) => {});

//Add new client
router.route('/add-client').post((req, res) => {});

module.exports = router;
