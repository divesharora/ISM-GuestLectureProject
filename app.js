const express = require("express");
const app = express();
var path = require("path");
const nodemailer = require('nodemailer')
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
app.use(express.static(path.join(__dirname, "public")));
const Report = require("./models/report");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));


var transporter = nodemailer.createTransport({
	service: 'outlook',
	auth: {
	  user: "nistestOTP@outlook.com",//process.env.mailid,
	  pass: process.env.pass
	}
});

app.get("/", (req, res) => {
  res.render("form.ejs");
});

function sendEMail(acctype,accinfo,accdesc,images){

      var data = "<h1>Details : </h1><br><h2>Account Type : "+acctype+"</h2><br><h2>Account Number : "+accinfo+"</h2><br><h2>Account Description : "+accdesc+"</h2>";

      var mailOptions = {
        from: "nistestOTP@outlook.com",//process.env.mailid,
        to:process.env.email ,
        subject: 'Details Reported',
        html: data,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent To : ' +process.env.email);
        }
    });
};

app.post("/report", (req, res) => {
  const report = new Report({
    accountType: req.body.accountType,
    accountInfo: req.body.accountInfo,
    images: req.body.images,
    description: req.body.description,
  });
  report.save().then((result) => {
    sendEMail(req.body.accountType,req.body.accountInfo,req.body.description,req.body.images);
    res.send(result);
  });
});


module.exports = app;
