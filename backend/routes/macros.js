const router = require('express').Router();
let Macros = require('../models/macros.model');

//Admin and Client: Get all entries for one user
router.route('/macros-log/:id').get((req, res) => {});

//Client: Add daily macros
router.route('/macros-log').post((req, res) => {});

module.exports = router;
