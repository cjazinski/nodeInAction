//Serial flow control


//Using callbacks
setTimeout(function() {
	console.log('I execute first');
	setTimeout(function() {
		console.log('I execute Next');
		setTimeout(function() {
			console.log('I am last');
		},100);
	},500);
},1000);

//We can also you flow-control lib 'nimble'

var flow = require('nimble');

flow.series([
	function(callback) {
		setTimeout(function(){
			console.log('1st...');
			callback();
		},1000);
	},
	function(callback) {
		setTimeout(function(){
			console.log('2nd...');
			callback();
		},500);
	},
	function(callback) {
		setTimeout(function(){
			console.log('3rd...');
			callback();
		},100);
	}
]);