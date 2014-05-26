var http = require('http');
var server = http.createServer(function(request, response) {
	//set the encoding
	request.setEncoding('utf-8');
	request.on('data', function(chunk) {
		console.log('parsed ' + chunk);
	});
	request.on('end', function() {
		console.log('done parsing..');
		response.end();
	});
});
server.listen(8000);