var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auth', function() {
    console.log('Nawiazano polaczenie z mongodb.');
});

var user = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        select: false
    }
});

module.exports = mongoose.model('User', user);
