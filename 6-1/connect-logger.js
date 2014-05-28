var connect = require('connect');
var app = connect();

//custom token for logger
var url = require('url');
connect.logger.token('query-string', function(req, res) {
	return url.parse(req.url).query;
});
//app.use(connect.logger());
//app.use(connect.logger(':method :url :response-time ms'));
app.use(connect.logger('dev'));
app.use(hello);
app.listen(8000);


function hello(req, res) {
	res.end('Hello World');
}