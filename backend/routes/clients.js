const router = require("express").Router();
let Client = require("../models/client.model");
let Goals = require("../models/goals.model");

//Get all clients personal info
router.route("/").get((req, res) => {
  Client.find()
    .then(clients => res.json(clients))
    .catch(err => res.status(400).json("Error: " + err));
});

//Get one client's personal info
router.route("/:id").get((req, res) => {
  Client.findById(req.params.id)
    .then(client => res.json(client))
    .catch(err => res.status(400).json("Error: " + err));
});

//Get client goals based on user id
router.route("/goals/:user").get((req, res) => {
  Goals.findOne({ user: req.params.user })
    .then(client => res.json(client))
    .catch(err => res.status(400).json("Error: " + err));
});

//Set client goals based on id
router.route("/goals").post((req, res) => {
  const data = req.body;

  const weeklyGoal = new Goals(data);

  weeklyGoal
    .save()
    .then(() => res.json("Goals updated"))
    .catch(err => res.status(400).json("Error: " + err));
});

//Add new client
router.route("/add-client").post((req, res) => {
  const data = req.body;

  const newClient = new Client(data);

  newClient
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
