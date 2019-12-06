const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const url = "mongodb://127.0.0.1:27017/healthcoaching";

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

connection.on("error", err => {
  console.error("Error: ", err);
});

const weightRouter = require("./routes/weight");
const clientsRouter = require("./routes/clients");

app.use("/weight", weightRouter);
app.use("/clients", clientsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
