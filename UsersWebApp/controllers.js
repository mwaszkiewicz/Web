var mongo = require('mongodb');
var templating = require('./templating.js');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {
    auto_reconnect: true
});
db = new Db('Users', server);

db.open(function(err, db) {
    if (!err) {
        console.log("Connected to 'users' database");
        db.collection('users', {
            strict: true
        }, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist.");
            }
        });
    }
});

exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            // console.log(items);
            // templating.render(res, 'views/view.html', {
            //     pageTitle: 'dupa',
            //     users: JSON.stringify(items)
            // });
            res.send(items);
        });
    });
};
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving user: ' + id);
    db.collection('users', function(err, collection) {
        collection.findOne({
            '_id': new BSON.ObjectID(id)
        }, function(err, item) {
            res.send(item);
        });
    });
};

exports.addUser = function(req, res) {
    var user = req.body;
    console.log('Adding wine: ' + JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.insert(user, {
            safe: true
        }, function(err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateUser = function(req, res) {
    var id = req.params.id;
    var user = req.body;
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(user));
    db.collection('wines', function(err, collection) {
        collection.update({
            '_id': new BSON.ObjectID(id)
        }, user, {
            safe: true
        }, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });
};

exports.deleteUser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
    db.collection('users', function(err, collection) {
        collection.remove({
            '_id': new BSON.ObjectID(id)
        }, {
            safe: true
        }, function(err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred - ' + err
                });
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};

exports.getLabel = function(req, res) {
  res.send({
      'kuku': 'kukulele'
  });
};
exports.getLabel2 = function(req, res) {
  var user = req.body;
  console.log('Adding wine: ' + JSON.stringify(user));

              res.send({
                  'error': 'An error has occurred'
              });
          
};
