//Basic Chatserver
var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

//create a function listen

exports.listen = function(server) {
	io = socketio.listen(server);
	io.set('log level', 1);

	io.sockets.on('connection', function(socket) {
		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
		joinRoom(socket, 'Lobby');

		handleMessageBroadcasting(socket, nickNames);
		handleNameChange(socket, nickNames, namesUsed);
		handleRoomJoining(socket);

		socket.on('rooms', function() {
			socket.emit('rooms', io.sockets.manager.rooms);
		});

		/*
		 * Polling from the server on the channel every 1000ms
		setInterval(function() {
		var message = {
			room: 'Lobby',
			text: 'TEST Push from Server!!!'
		};
			socket.emit('message', message);
		}, 1000);
		*/

		handleClientDisconnection(socket, nickNames, namesUsed);

	});
}; // end listen();

//Function to assign a temporary name to the user when they connect to socket.io
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
	var name = 'Guest' + guestNumber;
	nickNames[socket.id] = name;
	socket.emit('nameResult', {
		success: true,
		name: name
	});
	namesUsed.push(name);
	return guestNumber + 1;
}

function joinRoom(socket, room) {
	socket.join(room);
	currentRoom[socket.id] = room;
	socket.emit('joinResult', {room: room});
	socket.broadcast.to(room).emit('message', {
		text: nickNames[socket.id] + ' has joined ' + room + '.'
	});
	var usersInRoom = io.sockets.clients(room);
	if (usersInRoom.length > 1) {
		var usersInRoomSummary = 'Users currently in ' + room + ': ';
		for (var i in usersInRoom) {
			var userSocketId = usersInRoom[i].id;
			if (userSocketId != socket.id) {
				if (i > 0) {
					usersInRoomSummary += ', ';
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}
		usersInRoomSummary += '.';
		socket.emit('message',  {text: usersInRoomSummary});
	}
}

//Lets handle the user requesting to changes from their crappy given name
function handleNameChange(socket, nickNames, namesUsed) {
	socket.on('nameChange', function(name) {
		if (name.indexOf('Guest') == 0 ) {
			socket.emit('nameResult', {
				success: false,
				message: 'Name cannot begin with "Guest"'
			});
		} else {
			if (namesUsed.indexOf(name) == -1) { //name not found
				var pName = nickNames[socket.id];
				var pNameIndex = namesUsed.indexOf(pName);
				namesUsed.push(name);
				nickNames[socket.id] = name;
				delete namesUsed[pNameIndex];
				socket.emit('nameResult', {
					success: true,
					name: name
				});
				socket.broadcast.to(currentRoom[socket.id]).emit('message', {
					text: pName + ' is now known as ' + name + '.'
				});
			} else { //name already in use
				socket.emit('nameResult', {
					success: false,
					message: 'Name is already in use!'
				});
			}
		}
	});
} //end handleNameChange

function handleMessageBroadcasting(socket) {
	socket.on('message', function(message) {
		socket.broadcast.to(message.room).emit('message', {
			text: nickNames[socket.id] + ': ' + message.text
		});
	});
}

function handleRoomJoining(socket) {
	socket.on('join', function(room) {
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom);
	});
}

function handleClientDisconnection(socket) {
	socket.on('disconnect', function() {
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	});
}