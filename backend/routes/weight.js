const router = require('express').Router();
let Weight = require('../models/weight.model');

//Admin and Client: Get all entries for one user
router.route('/weight-log/:user').get((req, res) => {
  Weight.find({ user: req.params.user })
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Admin and Client: Get weight entry based on date
router.route('/:user/:date').get((req, res) => {
  const userInfo = req.params;

  Weight.findOne({ user: userInfo.user, date: userInfo.date })
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Client: Add daily weight
router.route('/daily-log').post((req, res) => {
  const newEntry = new Weight(req.body);

  newEntry
    .save()
    .then(() => res.json('Daily weight added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Client: Update daily weight
router.route('/update-weight').post((req, res) => {
  console.log(req.body);
  // const newEntry = new Weight(req.body);

  // newEntry
  //   .save()
  //   .then(() => res.json('Daily weight added'))
  //   .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

// const userInfo = req.body;
// const userId = { _id: userInfo._id };

// Client.findOneAndUpdate(userId, userInfo, {
//   new: true
// })
//   .then(client => res.json(client))
//   .catch(err => res.status(400).json('Error: ' + err));
