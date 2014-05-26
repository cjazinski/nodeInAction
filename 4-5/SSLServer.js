var http = require('https');
var fs = require('fs');
var options = {
	key: fs.readFileSync('./key.pem'),
	cert: fs.readFileSync('./key-cert.pem')
};

var server = http.createServer(options, function(req, res) {
	res.writeHead(200);
	res.end('Hello World\n');
});
server.listen(8000);