module.exports = function(grunt) {
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),

	concat: {
	  options: {
	   // define a string to put between each file in the concatenated output
		separator: ';\n'
	  },
		dist: {
		// the files to concatenate
		    src: ['public/js/*.js'],
		    // the location of the resulting JS file
		    dest: 'dist/js/<%= pkg.name %>.js'
		}
	},

    uglify: {
	  options: {
	    // the banner is inserted at the top of the output
	    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	  },
	  dist: {
	    files: {
	      'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
	    }
	  }
	},

	less: {
        development: {
            options: {
                paths: ["public/less/*.less"],
                yuicompress: true
            },
            files: {
                "dist/css/main.css": "public/less/*.less"
            }
        }
    },

	watch: {
		files: ['public/js/*.js'],
		tasks: ['default']
	}
  });

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'uglify', 'less']);

};