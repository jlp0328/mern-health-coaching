const router = require("express").Router();
let Weight = require("../models/weight.model");

//Admin and Client: Get all entries for one user
router.route("/:user").get((req, res) => {
  Weight.find({ user: req.params.user })
    .then(client => res.json(client))
    .catch(err => res.status(400).json("Error: " + err));
});

//Admin and Client: Get most recent weight entry
router.route("/:user").get((req, res) => {
  Weight.findOne({ user: req.params.user })
    .then(client => res.json(client))
    .catch(err => res.status(400).json("Error: " + err));
});

//Client: Add daily weight
router.route("/daily-log").post((req, res) => {
  const data = req.body;

  data.date = undefined ? new Date() : data.date;

  const newEntry = new Weight(data);

  newEntry
    .save()
    .then(() => res.json("Daily weight added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
