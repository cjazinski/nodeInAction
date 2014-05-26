var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var root = __dirname;

var server = http.createServer(function(req, res) {
	var url = parse(req.url);
	var path = join(root, url.pathname);
	var stream = fs.createReadStream(path);
	stream.pipe(res);
	//If file not found it will crash server
	//lets handle the error
	stream.on('error', function(error) {
		res.statusCode = 500;
		res.end('Internal Server Error.. Boohoos!');
	});
});	
server.listen(8000);