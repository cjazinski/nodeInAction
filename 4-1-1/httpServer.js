var http = require('http');

var server = http.createServer(function(request, response) {
	//handle response
	/*
	response.write('Hello World!');
	response.end();
	*/
	//shorthand
	//response.end('Hello World!');

	//Reading request headres and setting response headers
	var body = 'Hello World';
	response.setHeader('Content-Length', body.length);
	response.setHeader('Content-Type', 'text/plain');
	//set the status
	response.statusCode = 200;
	response.end(body);
});

server.listen(8000);