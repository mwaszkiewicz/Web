var express = require('express');
var controllers = require('./controllers.js');
var app = express();

app.get('/users', controllers.findAll);
app.get('/users/:id', controllers.findById);
app.post('/users', controllers.add);
app.put('/users/:id', controllers.update);
app.delete('/users/:id', controllers.delete);

app.listen(3000);
console.log('Listening on port 3000...');
