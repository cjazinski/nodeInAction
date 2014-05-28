function logger(req, res, next) {
	console.log(req.method + ' ' + req.url);
	next();
}

function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World');
}

function restrict(req, res, next) {
	var auth = req.headers.authorization;
	if (!auth) return next(new Error('Unauthorized!'));

	var parts = auth.split(' ');
	var scheme = parts[0];
	var auth = new Buffer(parts[1], 'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	if (authenticateWithDB(user, pass)) {
		next();
	} else {
		console.log('Could not find user/pass');
	}
}

function authenticateWithDB(user, pass) {
	if (user == 'jane' && pass == 'ferret') {
		console.log('BS login is okay... cools');
		return true;
	}
	return false;
}

function admin(req, res, next) {
	switch (req.url) {
		case '/':
			res.end('try /users');
			break;
		case '/users':
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(['tobi', 'loki', 'jane']));
			break;
	}
}

var connect = require('connect');
var app = connect();
app.use(./logger(':method :url'));
app.use('/admin', restrict);
app.use('/admin', admin);
app.use(hello);// no next because its the end of the response
app.listen(8000);