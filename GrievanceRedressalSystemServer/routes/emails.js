var nodemailer      = require("nodemailer");
var express = require('express');
var emailRouter = express.Router();
const cors = require('./cors');
var config = require('../config');
var authenticate = require('../authenticate');
var passport = require('passport');
var User = require('../models/user');

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

module.exports = emailRouter;