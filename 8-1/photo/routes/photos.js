var express = require('express');
var router = express.Router();
var photos = [];

photos.push({
	name: 'Node.js Logo',
	path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
	name: 'Ryan Speaking',
	path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

router.get('/upload', function(req, res) {
	res.render('photos/upload', {
		title: 'Photo Upload'
	});
});

var Photo = require('../models/Photos');
var path = require('path');
var fs = require('fs');
var join = path.join;

router.post('/upload', function(req, res, next) {
	console.log('Upload - POST');
	console.log(req.files);
	console.log(req.body);
	var img = req.files.photo.image;
	var name = req.body.photo.name || img.name;
	var path = __dirname + '/data/photos/' + img.name;
	fs.rename(img.path, path, function(error) {
		if (error) return next(error);
		Photo.create({
			name: name,
			path: img.name
		}, function(error) {
			if (error) return next(error);
			res.redirect('/');
		});
	});
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('photos', {
		title: 'Photos',
		photos: photos
	});
});

module.exports = router;