var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/usersDb');
var mongoSchema = mongoose.Schema;
var userSchema = {
    "userName": String,
    "fullName": String,
    "email": String
};


module.exports = mongoose.model('users', userSchema);
