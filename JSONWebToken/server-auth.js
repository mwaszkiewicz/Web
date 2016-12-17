var express = require('express');
var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');
var User = require('./user');

var app = express();
app.use(require('body-parser').json);

var secretKey = 'supersecretkey';

app.post('/session', function(req, res, next) {
    console.log('weszlo do post');

    User.findOne({
            username: req.body.username
        }).select('password')
        .exec(function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send(401);
            }
            bcrypt.compare(req.body.password, user.password, function(err, valid) {
                if (err) {
                    return next(err);
                }
                if (!valid) {
                    return res.send(401);
                }

                var token = jwt.encode({
                    username: user.username
                }, secretKey);
                res.json(token);
            });
        });
});

app.get('/user', function(req, res) {
    console.log('weszlo do get');
    var token = req.headers['x-auth'];
    var auth = jwt.decode(token, secretKey);
    User.findOne({
        username: auth.username
    }, function(err, user) {
        res.json(user);
    });
});

app.post('/user', function(req, res, next) {
    console.log('weszlo do get user');
    var user = new User({
        username: req.body.username
    });
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        user.password = hash;
        user.save(function(err) {
            if (err) {
                throw next(err);
            }
            res.json(201);
        });
    });
});

console.log('Server listening at port 3000');
app.listen(3000);
