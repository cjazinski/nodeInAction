var fs = require('fs');
var request = require('request');
var htmlParser = require('htmlparser');
var RSSFeeds = './rss_feeds.txt';

//Check to see if RSSFeeds file exists
function checkForRSSFile() {
	fs.exists(RSSFeeds, function(exists) {
		if(!exists)
			return next(new Error('Could not find RSS File ' + RSSFeeds));
		//else
		next(null, RSSFeeds);
	});
}

//Read the file line by line to get the URLS
function readRSSFile(RSSFeeds) {
	fs.readFile(RSSFeeds, function(error, feeds) {
		if(error)
			return next(error);
		feeds = feeds.toString()
					 .replace(/^s+|\s+$/g, '')
					 .split('\n');
		var randomNumber = Math.floor(Math.random() * feeds.length);
		next(null, feeds[randomNumber]);
	});
}

//download the feed data from given URL
function downloadRSSFeed(feedURL) {
	request({
		uri:feedURL
	}, function(error, response, body) {
		if (error)
			return next(error);
		if (response.statusCode != 200) { //Problem?
			return next(new Error('Abnormal Response received from server ' + response.statusCode));
		}
		next(null, body);
	});
}

//parse the feed data
function parseRSSFeed(rss) {
	var handler = new htmlParser.RssHandler();
	var parser = new htmlParser.Parser(handler);
	parser.parseComplete(rss);

	if (!handler.dom.items.length)
		return next(new Error('No RSS items found in feed!'));
	console.log(rss);
	var item = handler.dom.items.shift();
	console.log(item.title);
	console.log(item.link);
}

//create the task array in order i want executed
var tasks = [
	checkForRSSFile,
	readRSSFile,
	downloadRSSFeed,
	parseRSSFeed
];

//next operator to move between tasks
function next(error, result) {
	if (error) throw error;

	var currentTask = tasks.shift();

	if (currentTask) {
		currentTask(result);
	}
}

//Start the serial execution

next();