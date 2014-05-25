var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var fileDir = './text';

function checkIfComplete() {
	completedTasks++;
	if(completedTasks == tasks.length) {
		for(var i in wordCounts) {
			console.log(i + ': ' + wordCounts[i]);
		}
	}
}