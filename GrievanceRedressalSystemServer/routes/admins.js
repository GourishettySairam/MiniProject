var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
var config = require('../config');
const cors = require('./cors');
var Clients = require('../models/client');
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
          console.log(tickets);
          console.log("sairam is trying to get tickets");
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
          console.log('Ticket Created ', dish);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(dish);
      }, (err) => {console.log(req.body);next(err)})
      .catch((err) => next(err));
});

adminRouter.put('/changeticket/:ticketId',cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>
{
  Clients.findOneAndUpdate(req.params.ticketId,{$set:req.body},{new:true})
  .then((ticket) => {
    console.log('status updated ',ticket);
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(ticket);
  }, (err) => {console.log('errror occured while changing status');next(err)})
  .catch((err) => next(err));
});


module.exports = adminRouter ;
