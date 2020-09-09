var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
var config = require('../config');
const cors = require('./cors');
var Clients = require('../models/client');
var Members = require('../models/member');

var Categories = require('../models/category');
var mongoose = require('mongoose');


var adminRouter = express.Router();
adminRouter.use(bodyParser.json());

adminRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); } )

adminRouter.get('/gettickets', cors.corsWithOptions,authenticate.verifyUser ,authenticate.verifyAdmin, (req, res, next) =>
{
      Clients.find({})
        .then((tickets) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(tickets);
          // console.log(tickets);
          // console.log("sairam is trying to get tickets");
      }, (err) => next(err))
      .catch((err) => next(err));
})

adminRouter.get('/gettickets/:ticketId',cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>
{
  Clients.findOne({'id':req.params.ticketId})
  .then((ticket) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(ticket);
  }, (err)=> next(err))
  .catch((err) => next(err));
})

adminRouter.post('/postticket',cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>
{
      Clients.create(req.body)
      .then((dish) => {
        //  console.log('Ticket Created ', dish);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(dish);
      }, (err) => {console.log(req.body);next(err)})
      .catch((err) => next(err));
});

adminRouter.put('/changeticket/:ticketId',cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>
{
  Clients.findOne({'id':req.params.ticketId})
  .then((ticket) => {
    if(ticket !=null){
      if(req.body.message){
        ticket.message = req.body.message;
        ticket.lastupdatedat = req.body.lastupdatedat;
      }
      if(req.body.status){
        ticket.status = req.body.status;
        ticket.lastupdatedat = req.body.lastupdatedat;
      }
      if(req.body.assignedto){
        ticket.assignedto = req.body.assignedto;
      }
      if(req.body.rating){
        ticket.rating = req.body.rating;
      }

      ticket.save()
      .then((ticket) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ticket);
      },(err) => next(err));
    }
  }, (err) => next(err))
    .catch((err) => next(err));
})

adminRouter.post('/addmembers',cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>
{
  Members.create(req.body)
  .then((member) => {
    //console.log("member added");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(member);
  }, (err) => { console.log(err); next(err)})
});

adminRouter.get('/getmembers', cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) =>
{
      Members.find({})
        .then((tickets) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(tickets);
          //console.log(tickets);
      }, (err) => next(err))
      .catch((err) => next(err));
})

adminRouter.get('/getmemberbyname/:name', cors.corsWithOptions,authenticate.verifyUser ,authenticate.verifyAdmin, (req, res, next) =>
{
      Members.find({'name':req.params.name})
        .then((tickets) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(tickets);
          //console.log(tickets);
          //console.log("sairam is trying to get members");
      }, (err) => next(err))
      .catch((err) => next(err));
})

adminRouter.get('/getclosedcount', cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  Clients.count({'status':'Closed'}, function(err, result) {
     if (err) {
       console.log(err);
     } else {
       //console.log('number is ' +  result);
       res.json({'count':result});
     }
   });
})

adminRouter.get('/getassignedcount', cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  Clients.count({'assignedto': { $ne : ''} }, function(err, result) {
     if (err) {
       console.log(err);
     } else {
       //console.log('number is ' +  result);
       res.json({'count':result});
     }
   });
})

adminRouter.post('/addcategory', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  Categories.create(req.body)
  .then((category) => {
      //console.log('Category Created ', category);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(category);
  }, (err) => {console.log(req.body);next(err)})
  .catch((err) => next(err));
})

adminRouter.get('/getcategories', cors.corsWithOptions, (req,res,next) =>
{
  Categories.find({})
    .then((categories) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(categories);
      //console.log(categories);
  }, (err) => next(err))
  .catch((err) => next(err));
})

adminRouter.delete('/deleteticket/:id', cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  Clients.deleteOne({'id':req.params.id}, function (err) {
    if(err) console.log(err);
    else{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({'success':'deleted'});
    }
  })
})

adminRouter.delete('/deletemember/:id', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  Members.deleteOne({'_id':req.params.id}, function (err) {
    if(err) console.log(err);
    else{
      //console.log("member deleted");
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({'success':'deleted'});
    }
  })
})

adminRouter.post('/addnewuser',cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.register(new User({username: req.body.username}),
    req.body.password, (err, user) => {
    if(err) {
      //console.log("inside if");
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      console.log("inside else");
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        else{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({'success':'added succesfully'});
        }
      });
    }
  });
});

adminRouter.get('/getusers', cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) =>
{
      User.find({})
        .then((users) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(users);
          //console.log(users);
      }, (err) => next(err))
      .catch((err) => next(err));
})

// authenticate.verifyUser, authenticate.verifyAdmin

module.exports = adminRouter ;
