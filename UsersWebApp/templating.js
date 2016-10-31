var fs = require('fs');

var render = function (response, view, params, httpCode) {
	fs.readFile(view, 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			return;
		}

		params = params || {};
		httpCode = httpCode || 200;

		for(var key in params) {
			data = data.replace(new RegExp('@' + key + '@', 'g'), params[key]);
		}

		response.writeHead(httpCode, { 'Content-type': 'text/html' });
		response.write(data);
		response.end();
	});
};

var collectionRender = function (response, view, params, httpCode) {
	fs.readFile(view, 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			return;
		}

		params = params || {};
		httpCode = httpCode || 200;
		var formatted = {};
		for (var key in params) {
			console.log('key', params[key]);
			if (key === 'user') {
				
				formatted += params[key].name + ' ' + params[key].age + '<br/>';
			} else {
				data = data.replace(new RegExp('@' + key + '@', 'g'), params[key]);
			}
		}
		data = data.replace(new RegExp('{{users}}', 'g'), formatted);
		console.log('formatted', formatted);
		response.writeHead(httpCode, { 'Content-type': 'text/html' });
		response.write(data);
		response.end();
	});
};

exports.render = render;
exports.collectionRender = collectionRender;