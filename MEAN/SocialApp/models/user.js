var db = require('../db');

var User = db.model('User', {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});
module.exports = User;

//ustawienie select false mowi o tym
//aby zawartosc tego pola nie byla nigdzie wysylana
