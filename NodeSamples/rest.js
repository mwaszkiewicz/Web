var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoOp = require("./model/mongo");
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

router.get("/", function (req, res) {
    res.json({ "error": false, "message": "Hello World" });
});

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.

router.route("/users")
    .get(function (req, res) {
        var response = {};
        mongoOp.find({}, function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
    .post(function (req, res) {
        var response = {};
        var user = new mongoOp({
            userName: req.body.userName,
            email: req.body.email
        });

        user.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = { "error": true, "message": "Error adding data" };
            } else {
                response = { "error": false, "message": "Data added" };
            }
            res.json(response);
        });
    });

router.route("/users/:id")
    .get(function (req, res) {
        var response = {};
        mongoOp.findById(req.params.id, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
    .put(function (req, res) {
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        mongoOp.findById(req.params.id, function (err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                //  we got data from Mongo.
                // change it accordingly.
                if (req.body.email !== undefined) {
                    //         case where email needs to be updated.
                    data.email = req.body.email;
                }
                if (req.body.userName !== undefined) {
                    //           case where password needs to be updated
                    data.userName = req.body.userName;
                }
                //         save the data
                data.save(function (err) {
                    if (err) {
                        response = { "error": true, "message": "Error updating data" };
                    } else {
                        response = { "error": false, "message": "Data is updated for " + req.params.id };
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function (req, res) {
        var response = {};
        // find the data
        mongoOp.findById(req.params.id, function (err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                //   data exists, remove it.
                mongoOp.remove({ _id: req.params.id }, function (err) {
                    if (err) {
                        response = { "error": true, "message": "Error deleting data" };
                    } else {
                        response = { "error": true, "message": "Data associated with " + req.params.id + "is deleted" };
                    }
                    res.json(response);
                });
            }
        });
    });

app.use('/', router);

app.listen(3008);
console.log("Listening to PORT 3008");
