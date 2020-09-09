var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var Token = require('../models/token');
var passport = require('passport');
var authenticate = require('../authenticate');
var config = require('../config');
const cors = require('./cors');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

var router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); } )

router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) =>
{
    //console.log(req);
      User.find({})
        .then((users) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(users);
      }, (err) => next(err))
      .catch((err) => next(err));
  })

router.post('/signup',cors.corsWithOptions, (req, res, next) => {
  User.register(new User({username: req.body.username}),
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.username)
        user.username = req.body.username;
      if (req.body.email)
        user.email = req.body.email;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }

		var token = new Token({ _userId: user._id, token: Math.floor(Math.random() * 1000000) });
        token.save(function (err) {
            if (err) { console.log("inside if");return res.status(500).send({ msg: err.message }); }

            var transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
                    user: 'sairamgourishetty99@gmail.com',
                    pass: ')7)8i)h6g'
                }
            });

            const mailOptions = {
              from: 'sairamgourishetty99@gmail.com', // sender address
              to: req.body.email, // list of receivers
              subject: 'Account Verification Token', // Subject line
              html: 'Please verify your account by entering the Otp ' +  '<b>' + token.token + '</b>'  // plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
               if(err)
                 console.log("error occured " + err);
               else
               {
                 res.statusCode = 200;
                 res.setHeader('Content-Type', 'application/json');
                 res.send({'status':'success'})
                 //console.log(info);
               }
             });
        });

        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

router.post('/login', cors.corsWithOptions, (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err)
    {
      console.log("occuring in login");
      return next(err);

    }

    if (!user) {
      res.statusCode = 401;
      console.log("occuring in login");
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Login Unsuccessful!', err: info});
    }
    req.logIn(user, (err) => {
      if (err) {
        console.log("occuring in req.login");
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});
      }
      console.log("occuring out req.login");
      var token = authenticate.getToken({_id: req.user._id});
      console.log("user is " + user);
      if(user.isVerified){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Login Successful!', token: token});
      }
      else{
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});
      }
    });
  }) (req, res, next);
});

router.get('/logout', cors.corsWithOptions, (req, res,next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.get('/checkJWTtoken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});

    }
  }) (req, res);
});



router.post('/checkotp', cors.corsWithOptions, (req, res, next) => {

  Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

        // If we found a token, find a matching user
        User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.json( { status: err.message });
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({status: 'The account has been verified. Please log in.'});

            });
        });
    });
});

router.post('/resendotp', cors.corsWithOptions, (req, res, next) => {
  User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: Math.floor(Math.random() * 1000000) });

        // Save the token
        token.save(function (err) {
          if (err) { console.log("inside if");return res.status(500).send({ msg: err.message }); }

          var transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
                  user: 'sairamgourishetty99@gmail.com',
                  pass: ')7)8i)h6g'
              }
          });

          const mailOptions = {
            from: 'sairamgourishetty99@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Account Verification Token', // Subject line
            html: 'Please verify your account by entering the Otp ' +  '<b>' + token.token + '</b>'  // plain text body
          };

          transporter.sendMail(mailOptions, function (err, info) {
             if(err)
               if (err) { return res.status(500).send({ msg: err.message }); }
             else
             {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.send({status:'A verification email has been sent to ' + user.email + '.'})
               //console.log(info);
             }
           });
        });

    });

});



module.exports = router ;
