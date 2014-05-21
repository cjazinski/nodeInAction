var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

//more then 10 listeners node will throw warning unless param is specified
channel.setMaxListeners(50);

channel.on('join', function(id, client) {
	this.clients[id] = client;
	this.subscriptions[id] = function(senderID, message) {
		if (id != senderID)
			this.clients[id].write(message);
	}
	this.on('broadcast', this.subscriptions[id]);
	var str = 'Welcome! - Guests online ' + this.listeners('broadcast').length;
	client.write(str + '\n');
});

//Need to clean up after users leave.. they will leave a listener object
channel.on('leave', function(id) {
	channel.removeListener('broadcast', this.subscriptions[id]);
	channel.emit('broadcast', id, id + ' has left the chat. \n');
});

/*
 * net.createServer([options], [connectionListener])
 * Creates a new TCP server. The connectionListener argument is automatically set as a listener for the 'connection' event.
 */

var server = net.createServer(function(client) {
	var id = client.remoteAddress + ':' + client.remotePort;

	/* when this code is run, the connection has been established 
	 * http://stackoverflow.com/questions/16903844/node-js-net-events-dont-fire
	 *
	 *
	 client.on('connect', function() {
		channel.emit('join', id, client);
		console.log('connecting to channel...');
	 });
     */
	console.log('A user has joined the party line: ', id);
	channel.emit('join', id, client);

	client.on('data', function(data) {
		console.log('Data: ' + data.toString());
		channel.emit('broadcast', id, data.toString()); 
	});

	//What happens when the client leavs
	client.on('close', function() {
		channel.emit('leave', id);
	});

});

server.listen(8889);