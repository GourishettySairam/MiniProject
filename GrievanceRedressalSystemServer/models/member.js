var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({

  id: {
    type: String,
    unique : true
  },

  name: {
    type: String,
    default: ''
  },

  email: {
    type: String,
    default: ''
  },

  department: {
    type: String,
    default: ''
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Member',memberSchema);
