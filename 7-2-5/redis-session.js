var connect = require('connect');
var RedisStore = require('connect-redis')(connect);

var app = connect();
app.use(connect.favicon());
app.use(connect.cookieParser('keyboard cat'));
app.use(connect.session({ store: new RedisStore({prefix:'sid'})}));
app.listen(8000);