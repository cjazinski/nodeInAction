var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs =  require('fs');
//Lets set the root of the web app
var root = __dirname; //Magical mystical node var

var server = http.createServer(function(req, res) {
	var url = parse(req.url);
	var path = join(root, url.pathname);

	res.end();
});

server.listen(8000);