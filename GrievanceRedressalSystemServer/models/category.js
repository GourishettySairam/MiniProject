var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({

  categoryname: {
    type: String,
    default: ''
  },

  head: {
    type: String,
    default: ''
  },

  count: {
    type: Number,
    default : 0
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Category',categorySchema);
