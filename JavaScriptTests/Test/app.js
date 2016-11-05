// *** main dependencies *** //
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');

// *** routes *** //
var routes = require('./routes/index.js');

// *** express instance *** //
var app = express();

// *** config file *** //
var config = require('./_config');

// *** mongoose *** ///
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
    if (err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
    }
});

// *** config middleware *** //
app.use(bodyParser.json());

// *** main routes *** //
app.use('/', routes);

// *** server config *** //
var server = http.createServer(app);
server.listen(1337, function() {
    console.log("Node server running on http://localhost:1337");
});

module.exports = app;
