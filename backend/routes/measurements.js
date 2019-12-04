const router = require('express').Router();
let Measurements = require('../models/measurements.model');

//Admin and Client: Get all entries for one user
router.route('/monthly-measurements/:id').get((req, res) => {});

//Client: Add monthly measurements
router.route('/monthly-measurements').post((req, res) => {});

module.exports = router;
