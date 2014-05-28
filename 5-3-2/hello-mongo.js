var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017, {});

var client = new mongodb.Db('mydatabase', server, {w:1});

client.open(function(error) {
	if (error) throw error;
	client.collection('test_insert', function(error, collection) {
		if (error) throw error;
		console.log('We are now able to perform queries');
		var id;
		//insert a doc in collection
		collection.insert({
			'title': 'I like cake',
			'body': 'It is quite good.'
			},
			{safe:true},
			function(error, documents) {
				if (error) throw error;
				console.log('Document ID is: ' + documents[0]._id);
			}
		);


	});
});