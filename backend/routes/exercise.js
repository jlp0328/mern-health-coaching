const _ = require("lodash");
const router = require("express").Router();
let Exercise = require("../models/exercise.model");

//Admin and Client: Get all entries for one user
router.route("/exercise-log/:id").get((req, res) => {
  Exercise.find({ user: req.params.user })
    .then(client => res.json(client))
    .catch(err => res.status(400).json("Error: " + err));
});

//Admin and Client: Get most recent exercise entry
router.route("/:user").get((req, res) => {
  Exercise.findOne({ user: req.params.user })
    .sort({ date: "desc" })
    .then(client => res.json(client))
    .catch(err => res.status(400).json("Error: " + err));
});

//Client: Add daily exercise
router.route("/daily-log").post((req, res) => {
  const data = req.body;

  data.date = _.isEmpty(data.date) ? new Date() : data.date;

  const newEntry = new Exercise(data);

  newEntry
    .save()
    .then(() => res.json("Daily exercise added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
