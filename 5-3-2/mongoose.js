var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1/tasks');

//Registering a schema
var Schema = mongoose.Schema;
var Tasks = new Schema({
	project: String,
	description: String
});

mongoose.model('Task', Tasks);

//Adding a Task
var Task = mongoose.model('Task');
var task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed Green!!!';
task.save(function(error) {
	if (error) throw error;
	console.log('Task Saved.');
});
console.log(task);

//Searching for a task
var Task = mongoose.model('Task'); //dont need it as we already declared
Task.find({project:'Bikeshed'}, function(error, tasks) {
	for (var i = 0; i < tasks.length; i++) {
		console.log('ID: '+ tasks[i]._id);
		console.log(tasks[i].description);
		tasks[i].remove();
	}
});