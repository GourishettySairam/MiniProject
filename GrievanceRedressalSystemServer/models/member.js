var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({

  // id: {
  //   type: String,
  //   unique : true
  // },

  name: {
    type: String,
    default: ''
  },

  email: {
    type: String,
    default: '',
    unique: true
  },

  department: {
    type: String,
    default: ''
  },

  ticketsassigned: {
    type:[Number]
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Member',memberSchema);
