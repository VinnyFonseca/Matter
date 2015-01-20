'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// CONFIG ===================================/

		compass: {
			dist: {
				options: {
					sassDir: ['styles/pre'],
					cssDir: ['styles'],
					outputStyle: 'compressed'
				}
			}
		},

		uglify: {
			all: {
				files: {
					'scripts/min/main.min.js': [
						'scripts/vendor/jquery-1.11.2.min.js',
						'scripts/vendor/modernizr-full.min.js',
						'scripts/vendor/fastclick.js',
						'scripts/vendor/picturefill.js',
						'scripts/vendor/jquery.highlight.js',
						'scripts/vendor/placeholders.min.js',
						'scripts/vendor/datepicker.js',
						'scripts/vendor/jquery.transit.js',
						'scripts/matter/*.js',
						'scripts/*.js'
					]
				}
			}
		},

		watch: {
			html: {
				files: ['**/*.html'],
				options: { livereload: true	}
			},
			php: {
				files: ['**/*.php'],
				options: { livereload: true	}
			},
			css: {
				files: ['styles/*.css'],
				options: { livereload: true	}
			},
			sass: {
				files: ['styles/**/*.{scss,sass}'],
				tasks: ['compass:dist'],
				options: {
					livereload: false
				}
			},
			js: {
				files: ['scripts/**/*.js', '!scripts/min/*.js'],
				tasks: ['uglify'],
				options: { livereload: true	}
			}
		}
	});


	// DEPENDENT PLUGINS =========================/

 	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');


	// TASKS =====================================/

	grunt.registerTask('default', ['watch']);
};