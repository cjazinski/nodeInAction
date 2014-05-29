var express = require('express');
var router = express.Router();

/*var photos = [];

photos.push({
	name: 'Node.js Logo',
	path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
	name: 'Ryan Speaking',
	path: 'http://nodejs.org/images/ryan-speaker.jpg'
});
*/

router.get('/upload', function(req, res) {
	res.render('photos/upload', {
		title: 'Photo Upload'
	});
});

var Photo = require('../models/Photos');
var fs = require('fs');
var formidable = require('formidable');
var uuid = require('node-uuid');

router.post('/upload', function(req, res, next) {
	console.log('Upload - POST');
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		/*Photo.create({
			name: fields.name,
			path: savePath
		}, function(error) {
			if (error) return next(error);
			res.redirect('/photos');
		});*/
		name = fields.name;
      	console.log('Renamed!!');
    });

    form.on('progress', function(bytesReceived, bytesExpected) {
        console.log(bytesReceived + ' ' + bytesExpected);
    });

	form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        //console.log(this.openedFiles[0].type);
        //e;
        var new_location = __dirname + '/data/' + uuid.v1();
        //var base64Img = fs.readFileSync(temp_path).toString('base64');
        //console.log('BASE ME: ' +  base64Img);
        //e;
        fs.rename(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!");
                var f = new_location + file_name;
                var base64Img = fs.readFileSync(f).toString('base64');
                console.log('Img: ' + base64Img);
                console.log('DB Call here');
                console.log('name: ' + name);
                console.log('path: ' + new_location + file_name);
                Photo.create({
						name: name,
						path: new_location + file_name,
						image: base64Img
					}, function(error) {
						if (error) return next(error);
						res.redirect('/photos');
					}
				);

            } //success
        });
    });
    //res.redirect('/photos');
    //res.end(util.inspect({fields: fields, files: files}));
});

/* GET home page. */
router.get('/', function(req, res) {
  Photo.find(function(err, photos) {
  	//console.log(photos);
  	res.render('photos', {
		title: 'Photos',
		photos: photos
	});
  });
  /*res.render('photos', {
		title: 'Photos',
		photos: photos
	});*/
});

module.exports = router;