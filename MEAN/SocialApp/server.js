var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(require('./controllers'));

app.listen(3000, function() {
    console.log('Serwer nasluchuje na porcie numer', 3000);
});
