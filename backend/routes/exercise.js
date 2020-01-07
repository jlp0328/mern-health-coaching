const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//Admin and Client: Get all entries for one user
router.route('/exercise-log/:user').get((req, res) => {
  Exercise.find({ user: req.params.user })
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Admin and Client: Get exercise entry based on date
router.route('/:user/:date').get((req, res) => {
  const userInfo = req.params;

  Exercise.findOne({ user: userInfo.user, date: userInfo.date })
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Client: Add daily exercise
router.route('/daily-log').post((req, res) => {
  const newEntry = new Exercise(req.body);

  newEntry
    .save()
    .then(() => res.json('Daily exercise added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
