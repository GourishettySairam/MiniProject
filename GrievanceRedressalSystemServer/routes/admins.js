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
      }, (err) => next(err))
      .catch((err) => next(err));
})

adminRouter.get('/getratedtickets', cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) =>
{
      Clients.find({'rating': { $ne : 0 } })
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

adminRouter.get('/gettodayscount/:date', cors.corsWithOptions, (req,res,next) => {
  Clients.count({'createdat': {'$gte': new Date(req.params.date)}}, function(err, result) {
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

adminRouter.get('/getcategories', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) =>
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

adminRouter.delete('/deletecategory/:id', cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  Categories.deleteOne({'_id':req.params.id}, function (err) {
    if(err) console.log(err);
    else{
      res.statusCode = 200;
      console.log('deleted');
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

adminRouter.delete('/deleteuser/:id', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.deleteOne({'_id':req.params.id}, function (err) {
    if(err) console.log(err);
    else{
      console.log("user deleted");
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
        user.isVerified = req.body.isVerified;
      if(req.body.email)
        user.email = req.body.email;
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

adminRouter.get('/getuseremail/:username', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>
{
      User.find({'username':req.params.username})
        .then((users) => {
          console.log(users);
          //console.log(users.email);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(users);
          //console.log(users);
      }, (err) => next(err))
      .catch((err) => next(err));
})

adminRouter.get('/totaltickets/:startDate',cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) =>
{
Clients.find({'createdat': {'$gte': new Date("2020-05-01"), '$lt':new Date("2020-09-30")}}).then(result => {
        let newMonthsArray= new Array();
        let monthwise = new Array();
        let monthsArray = ['January','February','March','April','May','June','July','August','September','October', 'November','December'];
        let months = {};
        for(let i=parseInt(req.params.startDate.substring(5,7))-1; i<12; i++){
            let year = parseInt(req.params.startDate.substring(0,4))-1;
            let month = parseInt(req.params.startDate.substring(5,7));
            newMonth = monthsArray[i] + '-' + year;
            newMonthsArray.push(newMonth);
            months[newMonth] = 0;
        }

        for(let i=0; i<parseInt(req.params.startDate.substring(5,7)); i++){
            let year = parseInt(req.params.startDate.substring(0,4));
            let month = parseInt(req.params.startDate.substring(5,7));
            newMonth = monthsArray[i] + '-' + year;
            newMonthsArray.push(newMonth);
            months[newMonth] = 0;
          }

        for(i=0; i<result.length; i++){
            let getDate = result[i].createdat.toISOString();
            let year = getDate.substring(0,4);
            let month = parseInt(getDate.substring(5,7));
            let monthName = monthsArray[month-1];
            let date =  monthName + '-' + year;
            let count = Number(months[date]) + 1;
            months[date] = count;
        }
         var monthnames = Object.keys(months);
         console.log(monthnames);

        var values = Object.values(months);
        console.log(monthnames);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({months : monthnames,count : values});
    })
  })

  adminRouter.get('/closedtickets/:startDate',cors.corsWithOptions,(req,res,next) =>
  {
  Clients.find({'status':'Closed','createdat': {'$gte': new Date("2020-05-01"), '$lt':new Date("2020-09-30")}}).then(result => {
          let newMonthsArray= new Array();
          let monthwise = new Array();
          let monthsArray = ['January','February','March','April','May','June','July','August','September','October', 'November','December'];
          let months = {};
          for(let i=parseInt(req.params.startDate.substring(5,7))-1; i<12; i++){
              let year = parseInt(req.params.startDate.substring(0,4))-1;
              let month = parseInt(req.params.startDate.substring(5,7));
              newMonth = monthsArray[i] + '-' + year;
              newMonthsArray.push(newMonth);
              months[newMonth] = 0;
          }

          for(let i=0; i<parseInt(req.params.startDate.substring(5,7)); i++){
              let year = parseInt(req.params.startDate.substring(0,4));
              let month = parseInt(req.params.startDate.substring(5,7));
              newMonth = monthsArray[i] + '-' + year;
              newMonthsArray.push(newMonth);
              months[newMonth] = 0;
            }

          for(i=0; i<result.length; i++){
              let getDate = result[i].createdat.toISOString();
              let year = getDate.substring(0,4);
              let month = parseInt(getDate.substring(5,7));
              let monthName = monthsArray[month-1];
              let date =  monthName + '-' + year;
              let count = Number(months[date]) + 1;
              months[date] = count;
          }
           var monthnames = Object.keys(months);
           console.log(monthnames);

          var values = Object.values(months);
          console.log(monthnames);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({months : monthnames,count : values});
      })
    })



// authenticate.verifyUser, authenticate.verifyAdmin

module.exports = adminRouter ;
