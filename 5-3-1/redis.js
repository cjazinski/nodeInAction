var redis = require('redis');
var client = redis.createClient(6379, '192.168.1.10');

client.on('error', function(error) {
	console.log('Error ' + error);
});

//name:value pairs
client.set('color', 'red', redis.print);
client.get('color', function(error, data) {
	if (error) throw error;
	console.log('value: ' + data);
});

//hashtable
client.hmset('camping', {
	'shelter' : '2-person tent',
	'cooking' : 'campstove'
}, redis.print);

client.hmget('camping', 'cooking', function(error, data) {
	if (error) throw error;
	console.log('Will be cooking with: ' +  data);
});

client.hkeys('camping', function(error, keys) {
	if (error) throw error;
	keys.forEach(function(key, i) {
		console.log(' ' + key);
	});
});

//lists
client.lpush('tasks', 'Paint the bikeshed red', redis.print);
client.lpush('tasks', 'Paint the bikeshed green', redis.print);
client.lrange('tasks', 0, -1, function(error, items) {
	if (error) throw error;
	items.forEach(function(item, i) {
		console.log(' ' + item);
	});
});

//sets good for unique keys
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '192.168.1.10', redis.print);
client.smembers('ip_addresses', function(error, members) {
	if (error) throw error;
	console.log(members);
});