function aSyncFunction(callback) {
	setTimeout(callback, 2000);
}

var color = 'blue';

/*
aSyncFunction(function() {
	console.log('The color is ' + color);
});
*/

//Add JS Closure to 'freeze' contents of color var while aSyncFunction is run
//basically puts the variables in the scope accessed by the function
(function(color) {
	aSyncFunction(function() {
		console.log('The color is ' + color);
	});
})(color);

color = 'green';