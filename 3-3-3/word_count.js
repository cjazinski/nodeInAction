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

function countWordsInText(text) {
	var words = text
				.toString()
				.toLowerCase()
				.split(/\W+/)
				.sort();
		for(var i in words) {
			var word = words[i];
			if (word) {
				console.log('Word: ' + word);
				console.log('WordCounts: ' + wordCounts[word]);
				wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
			}
		}
}

fs.readdir(fileDir, function(error, files) {
	if (error) throw error;
	for (var i in files) {
		var task = (function(file) {
			return function() {
				fs.readFile(file, function(error, text) {
					if (error) throw error;
					countWordsInText(text);
					checkIfComplete();
				});
			}
		})(fileDir + '/' + files[i]);
		tasks.push(task);
	}
	for (var task in tasks) {
		tasks[task]();
	}
});