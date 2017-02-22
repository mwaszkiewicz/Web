var router = require('express').Router();
var User = require('../../models/user');
var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');
var config = require('../../config');

router.get('/users', function(req, res, next) {
    if (!req.headers['x-auth']) {
        return res.sendStatus(401);
    }
    var auth = jwt.decode(req.headers['x-auth'], config.secret);
    User.findOne({
        username: auth.username
    }, function(err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});

router.post('/users', function(req, res, next) {
    var user = new User({
        username: req.body.username
    });
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        user.password = hash;
        user.save(function(err) {
            if (err) {
                throw next(err);
            }
            res.sendStatus(201);
        });
    });
});

module.exports = router;
