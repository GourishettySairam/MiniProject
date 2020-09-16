var nodemailer      = require("nodemailer");
var express = require('express');
var emailRouter = express.Router();
const cors = require('./cors');
var config = require('../config');
var authenticate = require('../authenticate');
var passport = require('passport');
var User = require('../models/user');
const bodyParser = require('body-parser');

emailRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); } )

emailRouter.get('/send', cors.corsWithOptions, (req, res, next) => {

    var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
            user: 'sairamgourishetty99@gmail.com',
            pass: ')7)8i)h6g'
        }
    });

    const mailOptions = {
      from: 'sairamgourishetty99@gmail.com', // sender address
      to: 'sairamgourishetty99@gmail.com', // list of receivers
      subject: 'New Ticket', // Subject line
      html: '<p>New Ticket Created</p>'// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
       if(err)
         console.log(err)
       else
       {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.send({'status':'success'})
         //console.log(info);
       }
     });
});

emailRouter.post('/notifymember/:mail', cors.corsWithOptions, (req, res, next) => {

    var email = req.params.mail;
    var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
            user: 'sairamgourishetty99@gmail.com',
            pass: ')7)8i)h6g'
        }
    });

    const mailOptions = {
      from: 'sairamgourishetty99@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Ticket Assigned', // Subject line
      html: '<p>New Ticket is assigned to you</p>'// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
       if(err)
       {
         console.log(err);
         console.log(req);
       }
       else
       {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.send({'status':'success'})
       }
     });
});

emailRouter.get('/notifyclient/:mail', cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {

    var email = req.params.mail;
    var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
            user: 'sairamgourishetty99@gmail.com',
            pass: ')7)8i)h6g'
        }
    });

    const mailOptions = {
      from: 'sairamgourishetty99@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Complaint Resolved', // Subject line
      html: '<p>Your complaint has been solved . Please login into the website to check complete details</p>'// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
       if(err)
       {
         console.log(err);
         console.log(req);
       }
       else
       {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.send({'status':'success'})
       }
     });
});

module.exports = emailRouter;
