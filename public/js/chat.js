//JS equivalent of a class
var Chat = function(socket) {
	this.socket = socket;
}

Chat.prototype.sendMessage = function (room, data) {
	var message = {
		room: room,
		text: data
	};
	this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function(room) {
	this.socket.emit('join', {
		newRoom: room
	});
};

//Process the commands
Chat.prototype.processCommand = function(command) {
	var words = command.split(' ');
	var command = words[0].substring(1, words[0].length).toLowerCase();
	var message = false;

	//Switch the commands
	switch(command) {
		case 'join':
			words.shift();
			var room = words.join(' ');
			this.changeRoom(room);
			break;
		case 'nick':
			words.shift();
			var name = words.join(' ');
			this.socket.emit('nameChange', name);
			break;
		default:
			message = 'Unknown command.';
			break;
	}
	return message;
};