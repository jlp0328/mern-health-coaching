const router = require('express').Router();
let Weight = require('../models/weight.model');

//Admin and Client: Get all entries for one user
router.route('/weight-log/:id').get((req, res) => {});

//Client: Add daily weight
router.route('/weight-log').post((req, res) => {});

module.exports = router;
