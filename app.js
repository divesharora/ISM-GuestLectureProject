const express = require("express");
const app = express();
var path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
app.use(express.static(path.join(__dirname, "public")));
const Report = require("./models/report");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("form.ejs");
});


app.post("/report", (req, res) => {
  const report = new Report({
    accountType: req.body.accountType,
    accountInfo: req.body.accountInfo,
    images: req.body.images,
    description: req.body.description,
  });
  report.save().then((result) => {
    res.redirect("result.ejs");
  });
});

module.exports = app;
