const router = require('express').Router();
let Client = require('../models/client.model');
let Goals = require('../models/goals.model');

//CLIENT INFO

//Get all clients personal info
router.route('/').get((req, res) => {
  Client.find()
    .then(clients => res.json(clients))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Get one client's personal info
router.route('/:id').get((req, res) => {
  Client.findById(req.params.id)
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Add new client
router.route('/add-client').post((req, res) => {
  const data = req.body;

  const newClient = new Client(data);

  newClient
    .save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update client record
router.route('/update-client').post((req, res) => {
  console.log(req);
  const userInfo = req.body;
  const userId = { _id: userInfo._id };

  Client.findOneAndUpdate(userId, userInfo, {
    new: true
  })
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

//CLIENT GOALS

//Get client goals based on user id and date
router.route('/goals/:user').get((req, res) => {
  Goals.findOne({ user: req.params.user })
    .sort({ _id: -1 })
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));

  // Goals.find({ user: req.params.user })
  // 	.sort({ _id: -1 })
  // 	.limit(1)
  // 	.then(client => res.json(client))
  // 	.catch(err => res.status(400).json('Error: ' + err));
});

//Get all client goals
router.route('/goals-log/:user').get((req, res) => {
  Goals.find({ user: req.params.user })
    .then(client => res.json(client))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Set client goals based on id
router.route('/goals').post((req, res) => {
  const data = req.body;

  const weeklyGoal = new Goals(data);

  weeklyGoal
    .save()
    .then(() => res.json('Goals updated'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update client goals

module.exports = router;
