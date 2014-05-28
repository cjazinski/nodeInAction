var mongodb = require('mongodb');
var server = new mongodb.Server('192.168.1.10', 27017, {});

var client = new mongodb.Db('mydatabase', server, {w:1});

client.open(function(error) {
	if (error) throw error;
	client.collection('test_insert', function(error, collection) {
		if (error) throw error;
		console.log('We are now able to perform queries');
	});
});