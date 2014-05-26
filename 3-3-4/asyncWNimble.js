var flow = require('nimble');
var exec = require('child_process').exec;

function downloadNodeVersion(version, destination, callback) {
	var url = 'http://nodejs.org/dist/node-v' + version + '.tar.gz';
	var filePath = destination + '/' + version + '.tgz';
	exec('curl ' + url + ' >' + filePath, callback);
}

//Use nimble
flow.series([
	function(callback) {
		flow.parallel([
			function(callback) {
				console.log('Downloading Node v0.4.5...');
				downloadNodeVersion('0.4.5', '/tmp', callback);
			},
			function(callback) {
				console.log('Downloading Node v0.4.6...');
				downloadNodeVersion('0.4.6', '/tmp', callback);
			},
			function(callback) {
				console.log('Downloading Node v0.4.7...');
				downloadNodeVersion('0.4.7', '/tmp', callback);
			}
		], callback);
	},
	// Lets archieve what we got from the parallel execute
	function(callback) {
		console.log('Creating an archive of downloaded files...');
		exec(
			'tar cvf node_distros.tar /tmp/0.4.5.tgz /tmp/0.4.6.tgz /tmp/0.4.7.tgz',
			function(error, stdout, stderr) {
				console.log('All Done!');
				callback();
			}
		);
	}
]);