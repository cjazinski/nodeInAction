function Watcher(watchDir, processedDir) {
	this.watchDir = watchDir;
	this.processedDir = processedDir;
}

var events = require('events');
var util = require('util');

util.inherits(Watcher, events.EventEmitter);
//equiv too
// Watcher.prototype = new events.EventEmitter();

var fs = require('fs');
var watchDir = './watch';
var processedDir = './done';

//Add a few methods added to the Watcher
Watcher.prototype.watch = function() {
	var watcher = this; //store reference for readdir callback
	fs.readdir(this.watchDir, function(err, files) {
		if(err) throw err;
		for (var i in files) {
			console.log('File Found: ' + files[i]);
			watcher.emit('process', files[i]);
		}
	});
}

Watcher.prototype.start = function() {
	var watcher = this;
	fs.watchFile(watchDir, function() {
		watcher.watch();
	});
}

//Watcher class defined lets use
var watcher = new Watcher(watchDir, processedDir);

//watch for the process method

watcher.on('process', function process(file) {
	var watchFile = this.watchDir + '/' + file;
	var processedFile = this.processedDir + '/' + file.toLowerCase();

	fs.rename(watchFile, processedFile, function(err) {
		if (err) throw err;
	});

	console.log('Processing: ' + file);
});

//Start the watcher
watcher.start();