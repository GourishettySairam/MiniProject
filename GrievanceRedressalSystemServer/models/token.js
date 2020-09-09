var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
  _userId : {
    type : String,
    unique:true
  },
  token : {
    type : String
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Token',tokenSchema);
