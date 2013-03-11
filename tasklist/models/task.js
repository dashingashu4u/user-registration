var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName         : String
  , userDescription  : String
  , userAuthor       : String   
  , userDeleted      : { type: Boolean, default: false }
  , userDate         : { type: Date, default: Date.now }
});


module.exports = mongoose.model('TaskModel', UserSchema)