var express = require('express');
var app = express();
var controllers = require('./controllers.js');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/view', controllers.findAll);
app.get('/users/:id', controllers.findById);
app.post('/save-form', controllers.addUser);
app.put('/users/:id', controllers.updateUser);
app.delete('/users/:id', controllers.deleteUser);

app.listen(3000);
console.log('Listening on port 3000...');
