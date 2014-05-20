/*
 * This will check to see if data is cached
 * and if not grab it and cache it
 */
 
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

var server = http.createServer(function(request, response) {
 var filePath = false;
 if (request.url == '/') {
  filePath = 'public/index.html';
 } else {
  filePath = 'public' + request.url;
 }
 var absPath = './' + filePath;
 serveStatic(response, cache, absPath);
});

server.listen(3000, function() {
 console.log('Server listening on port 3000.');
});

//Helper functions
function send404(response) {
 response.writeHead(404, {'Content-Type': 'text/plain'});
 response.write('Error 404: Resource not found!');
 response.end();
 //console.log('Node.js 404');
}

function sendFile(response, filePath, fileContents) {
 response.writeHead(200, {'content-type': mime.lookup(path.basename(filePath))} );
 response.end(fileContents);
 console.log('Node.js sent a file');
}

function serveStatic(response, cache, absPath) {
 if (cache[absPath]) {
  sendFile(response, absPath, cache[absPath]);
 } else {
  fs.exists(absPath, function(exists) {
   if (exists) {
    fs.readFile(absPath, function(err, data) {
     if (err) {
      send404(response);
     } else {
      cache[absPath] = data;
      sendFile(response, absPath, data);
     }
   }); //fs.readFile
   } else {
     send404(response);
   }
  }); //fs.exists
 } //end else
}