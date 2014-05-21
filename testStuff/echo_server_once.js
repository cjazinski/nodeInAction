var net = require('net');
/* 
 * the server will continue to respond to these events every
 * time they are encounted
 */
 
var server = net.createServer(function(socket) {
	socket.once('data', function(data) {
		socket.write(data);
	});
});

var str = 'telnet 127.0.0.1 8888 - every command should be echoed back to you\n';
console.log(str);
server.listen(8888);