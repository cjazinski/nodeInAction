var http =  require('http');
var formidable = require('formidable');

var server = http.createServer(function(req, res) {
	if ('/' == req.url) {
		switch (req.method) {
			case 'GET':
				show(res);
				break;
			case 'POST':
				upload(req, res);
				break;
			default:
				badRequest(res);
		}
	} else {
		notFound(res);
	}
});
server.listen(8000);

//Functions
function show(res) {
	var html = '<html><head><title>Upload File</title></head><body>'
			   + '<form method="POST" action="/" enctype="multipart/form-data">'
			   + '<p><input type="text" name="name" /></p>'
			   + '<p><input type="file" name="file" /></p>'
			   + '<p><input type="submit" value="Upload" /></p>'
			   + '</form></body></html>';
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
}

function upload(req, res) {
	if (!isFormData(req)) {
		res.statusCode = 400;
		res.end('Bad Request: expecting multipart/form-data');
		return;
	}

	var form = new formidable.IncomingForm();
	/*
	form.on('field', function(field, value) {
		console.log(field);
		console.log(value);
	});
	form.on('file', function(name, file) {
		console.log(name);
		console.log(file);
	});
	form.on('end', function() {
		res.end('Upload Complete!');
	});
	*/
	//ProgressBar
	form.on('progress', function(bytesReceived, bytesExpected) {
		var percent = Math.floor(bytesReceived / bytesExpected * 100);
		console.log(percent);
	});
	form.parse(req, function(error, fields, files) {
		console.log(fields);
		console.log(files);
		res.end('Upload complete!');
	});
}

function isFormData(req) {
	var type = req.headers['content-type'] || '';
	return 0 == type.indexOf('multipart/form-data')
}

function notFound(res){
	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Not Found');
}

function badRequest(res) {
	res.statusCode = 400;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Bad Request');
}