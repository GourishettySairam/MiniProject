var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var clientSchema = new Schema({

  id: {
    type: Number,
    unique: true
  },

   firstname: {
     type: String,
     default: ''
   },

   lastname: {
     type: String,
     default: ''
   },

   title: {
     type: String,
     default: ''
   },

   priority: {
     type: String,
     default: ''
   },

   status: {
     type: String,
     default: ''
   },

   category: {
     type: String,
     default: ''
   },

   assignedto: {
     type: String,
     default: ''
   }
 },
 {
     timestamps: true
 });


module.exports = mongoose.model('Client',clientSchema);
