var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
var config = require('../config');
const cors = require('./cors');
var Clients = require('../models/client');
var mongoose = require('mongoose');

var clientRouter = express.Router();
clientRouter.use(bodyParser.json());

clientRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); } )

clientRouter.get('/gettickets', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>
{
      Clients.find({})
        .then((tickets) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(tickets);
          console.log(tickets);
          console.log("sairam is trying to insert");
      }, (err) => next(err))
      .catch((err) => next(err));
})

clientRouter.get('/gettickets/:ticketId',cors.corsWithOptions,authenticate.verifyUser,(req,res,next) =>
{
  Clients.findOne({'id':req.params.ticketId})
  .then((ticket) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(ticket);
  }, (err)=> next(err))
  .catch((err) => next(err));
})

clientRouter.get('/gettickets/username/:something',cors.corsWithOptions,authenticate.verifyUser,(req,res,next) =>
{
  console.log("inside get tickets username");
  Clients.find({'firstname':req.params.something})
  .then((tickets) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(tickets);
    console.log(tickets);
    console.log("sairam is trying to get");
}, (err) => next(err))
.catch((err) => next(err));
})

clientRouter.get('/getassignedtickets/:username',cors.corsWithOptions,authenticate.verifyUser,(req,res,next) =>
{
  //console.log("inside get tickets username");
  Clients.find({'assignedto':req.params.username})
  .then((tickets) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(tickets);
    console.log(tickets);
    //console.log("sairam is trying to get");
}, (err) => next(err))
.catch((err) => next(err));
})

clientRouter.get('/getCount',cors.corsWithOptions, authenticate.verifyUser, (req,res,next) =>
{
   Clients.find({})
   .sort("-id")
   .limit(1)
   .exec((error,data) => {res.json({'count':data[0].id});});

})

clientRouter.post('/postticket',cors.corsWithOptions,authenticate.verifyUser,(req,res,next) =>
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


clientRouter.get('/date',cors.corsWithOptions,(req,res,next) =>
{
  Clients.find({'createdat': {'$gte': new Date("2020-09-08"), '$lt':new Date("2020-09-09")}})
  .then((tickets) => {
    // console.log(tickets[1].createdat.getDate());
    // console.log(tickets[1].createdat.getMonth());
    // console.log(tickets[1].createdat.getFullYear());
    // console.log(tickets[1].createdat.getHours());
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(tickets);
    console.log(tickets);
}, (err) => next(err))
.catch((err) => next(err));
})



module.exports = clientRouter ;
