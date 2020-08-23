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
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Category',categorySchema);
