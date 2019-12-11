const router = require("express").Router();
let Macros = require("../models/macros.model");

//Admin and Client: Get all entries for one user
router.route("/macros-log/:id").get((req, res) => {
  Macros.find({ user: req.params.user })
    .then(client => res.json(client))
    .catch(err => res.status(400).json("Error: " + err));
});

//Admin and Client: Get most recent macros entry
router.route("/:user").get((req, res) => {
  Macros.findOne({ user: req.params.user })
    .then(client => res.json(client))
    .catch(err => res.status(400).json("Error: " + err));
});

//Client: Add daily macros
router.route("/macros-log").post((req, res) => {
  const data = req.body;

  data.date = undefined ? new Date() : data.date;

  const newEntry = new Macros(data);

  newEntry
    .save()
    .then(() => res.json("Daily macros added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
