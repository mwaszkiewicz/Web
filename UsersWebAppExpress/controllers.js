var mongoOp = require('./model/mongoDB.js');

var findAll = function(req, res) {
	mongoOp.find({}, function (err, data) {
			if (err) {
					res = { "error": true, "message": "Error fetching data" };
			} else {
					res = { "error": false, "message": data };
			}
			res.json(res);
});
};

var findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving user by: ' + id);
		mongoOp.findById(id, function (err, data) {
				if (err) {
						res = { "error": true, "message": "Error fetching data" };
				} else {
						res = { "error": false, "message": data };
				}
				res.json(res);
		});
};

var addUser = function(req, res) {
		var user = new mongoOp({
				userName: req.body.userName,
				fullName: req.body.fullName,
				email: req.body.email
		});
		  console.log('Adding user: ' + user.userName);
		user.save(function (err) {
				if (err) {
						res = { "error": true, "message": "Error adding data" };
				} else {
						res = { "error": false, "message": "Data added" };
				}
				res.json(res);
		});
}

var updateUser = function(req, res) {
    var id = req.params.id;
    var user = req.body;
    console.log('Updating user: ' + id);
		mongoOp.findById(id, function (err, data) {
				if (err) {
						res = { "error": true, "message": "Error fetching data" };
				} else {
						if (user.email !== undefined) {
								data.email = user.email;
						}
						if (user.userName !== undefined) {
								data.userName = user.userName;
						}
						if (user.fullName !== undefined) {
								data.fullName = user.fullName;
						}
						data.save(function (err) {
								if (err) {
										res = { "error": true, "message": "Error updating data" };
								} else {
										res = { "error": false, "message": "Data is updated for " + req.params.id };
								}
								res.json(res);
						})
				}
		});
}

var deleteUser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
		mongoOp.findById(id, function (err, data) {
				if (err) {
						res = { "error": true, "message": "Error fetching data" };
				} else {
						mongoOp.remove({ _id: id }, function (err) {
								if (err) {
										res = { "error": true, "message": "Error deleting data" };
								} else {
										res = { "error": true, "message": "Data associated with " + id + "is deleted" };
								}
								res.json(res);
						});
				}
		});
}

exports.findAll = findAll;
exports.findById = findById;
exports.add = addUser;
exports.update = updateUser;
exports.delete = deleteUser;
