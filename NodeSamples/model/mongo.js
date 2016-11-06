var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/restDb');
// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var userSchema  = {
    "userName" : String,
    "email" : String
};
// create model if not exists.
module.exports = mongoose.model('users',userSchema);
