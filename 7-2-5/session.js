var connect = require('connect');
var app = connect();

var hour = 3600000;
var sessionOpts = {
	key: 'myapp_sid',
	cookie: {maxAge: hour * 24, secure: true}
};

app.use(connect.favicon());
app.use(connect.cookieParser('keyboard cat'));
app.use(connect.session(sessionOpts));
app.use(function(req, res, next) {
	var sess = req.session;
	if (sess.views) {
		res.setHeader('Content-Type', 'text/html');
		res.end('<p>Views: ' + sess.views + ' </p>');
		sess.views++;
	} else {
		sess.views = 1;
		res.end('Welcome to the session demo. REFRESH!!');
	}
});

app.listen(8000);