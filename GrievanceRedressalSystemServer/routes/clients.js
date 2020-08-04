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


module.exports = clientRouter ;