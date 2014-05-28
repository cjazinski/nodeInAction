function setup(format) {
	var regex = /:(\w)+/g;

	return function logger(req, res, next) {
		var str = format.replace(regex, function(match, property) {
			return req[property];
		});
		console.log(str);
		next();
	}
}

module.exports = setup;