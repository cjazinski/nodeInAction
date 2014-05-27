var fs = require('fs');
var path  = require('path');
var args = process.argv.splice(2); //used to ignore node script.js from being args
var command = args.shift();
var taskDesc = args.join(' ');
var file = path.join(process.cwd(), '/.tasks');

//Based on command lets do something
switch (command) {
	case 'list':
		listTasks(file);
		break;
	case 'add':
		addTask(file, taskDesc);
		break;
	default:
		console.log('Usage: ' + process.argv[0] + ' list|add [taskDescription]');
}

//Helper functions that actually do the magic
function loadOrInitTaskArray(file, cb) {
	fs.exists(file, function(exists) {
		var tasks = [];
		if(exists) {
			fs.readFile(file, 'utf8', function(error, data) {
				if (error) throw error;
				var data = data.toString();
				var tasks = JSON.parse(data || '[]');
				cb(tasks);
			});
		} else {
			cb([]);
		}
	});
}

function listTasks(file) {
	loadOrInitTaskArray(file, function(tasks) {
		for (var i in tasks) {
			console.log(tasks[i]);
		}
	});
}

function storeTasks(file, tasks) {
	fs.writeFile(file, JSON.stringify(tasks), 'utf8', function(error) {
		if (error) throw error;
		console.log('Saved..');
	});
}

function addTask(file, taskDesc) {
	loadOrInitTaskArray(file, function(tasks) {
		tasks.push(taskDesc);
		storeTasks(file, tasks);
	});
}