var fs = require('fs');
var log = fs.createWriteStream('./myapp.log', {flags:'a'});
var connect = require('connect');
var app = connect();

app.use(connect.favicon(__dirname + '/public/favicon.ico'));
app.use(connect.logger({format:'dev', stream: log}));
app.use(hello);
app.listen(8000);

function hello(req, res) {
	res.end('Hello World');
}