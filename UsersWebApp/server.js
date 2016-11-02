﻿
var http = require('http');
var url = require('url');

function start(routing) {
    http.createServer(function(request, response) {
        var pathName = url.parse(request.url).path;

        if (!routing[pathName]) {
            pathName = '/404';
        }

        routing[pathName](request, response);
    }).listen(3071);

    console.log("Listening to PORT 3071");
}

exports.start = start;
