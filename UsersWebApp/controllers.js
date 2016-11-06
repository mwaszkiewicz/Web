
var formidable = require('formidable');
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var dbUrl = "mongodb://localhost:27017/Users";
var templating = require('./templating.js');


function index(request, response) {
    templating.render(response, 'views/index.html', {
        pageTitle: 'Strona główna'
    });
}

function form(request, response) {
    templating.render(response, 'views/form.html', {
        pageTitle: 'Formularz rejestracji'
    });
}

function saveForm(request, response) {
    if ("POST" === request.method) {
        console.log('ok');
        handleForm(request);

    } else {
        response.writeHead(301, {
            'Content-type': 'text/plain'
        });
        response.end('Only POST Method Available!');
    }
}

function view(request, response) {
    console.log('view');
    getUsers(request, response);
}

function error404(request, response) {
    templating.render(response, 'views/error404.html', {
        pageTitle: 'Strona nie została znaleziona'
    });
}

var onSaveError = function(response) {
    templating.render(response, 'views/saveError.html', {
        pageTitle: 'Wystąpił błąd zapisu!'
    });
};


var onSaveSuccess = function(response, orderId) {
    console.log(orderId);
    templating.render(response, 'views/saveSuccess.html', {
        pageTitle: 'Poprawnie zapisano!',
        orderId: orderId
    });
};

var saveIntoDb = function(data, onSuccess, onError) {
    MongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            onError();
            console.log("Unable to connect to the mongoDB server. Error:", err);
            return;
        } else {
            console.log("Connection established to", dbUrl);

            var collection = db.collection("users");
            var user = {
                name: data.name,
                age: data.age
            };

            collection.insert(user, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    onSuccess(result);
                    console.log(result);
                }
                db.close();
            });
        }
    });
};

var handleForm = function(request) {

    var form = new formidable.IncomingForm();

    form.parse(request, function(err, fields) {
        if (err) {
            onSaveError(response);
            console.log(err);
            return;
        }

        var saveData = {};
        saveData.name = fields.name;
        saveData.age = fields.age;

        var onDbSuccess = function(result) {
            return onSaveSuccess(response, result.insertedIds[0]);
        };

        var onDbError = function() {
            return onSaveError(response);
        };
        saveIntoDb(saveData, onDbSuccess, onDbError);
    });
};

var getUsers = function(request, response) {
    MongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            onSaveError(response);
            console.log("Unable to connect to the mongoDB server. Error:", err);
            return;
        } else {
            console.log("Connection established to", dbUrl);

            var collection = db.collection("users");

            collection.find().limit(300).toArray(function(err, dataObjArr) {
                var users = [];
                var i = dataObjArr.length;
                if (err) {
                    onSaveError(response);
                }

                if (dataObjArr) {
                    while (i--) {
                        var user = new User(dataObjArr[i].name, dataObjArr[i].age);
                        console.log("obj:", user.name + "user" + user);
                        users.push(user);
                    }
                    db.close();
                    templating.render(response, 'views/view.html', {
                        pageTitle: 'view',
                        users: JSON.stringify(users)
                    });
                }
            });
        }
    });
};

function User(name, age) {
    this.name = name;
    this.age = age;
}

User.prototype.toString = function() {
    return this.name + " " + this.age;
};

exports.index = index;
exports.form = form;
exports.saveForm = saveForm;
exports.error404 = error404;
exports.view = view;
