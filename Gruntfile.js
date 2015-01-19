'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// CONFIG ===================================/

		compass: {
			dev: {
				options: {
					sassDir: ['styles/pre'],
					cssDir: ['styles'],
					environment: 'development'
				}
			},
			prod: {
				options: {
					sassDir: ['styles/pre'],
					cssDir: ['styles'],
					environment: 'production'
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
			options: {
				livereload: true,
			},
			html: {
				files: ['**/*.html'],
			},
			php: {
				files: ['**/*.php'],
			},
			css: {
				files: ['styles/*.css']
			},
			sass: {
				options: {
					livereload: false
				},
				files: ['styles/**/*.{scss,sass}'],
				tasks: ['compass:dev']
			},
			js: {
				files: ['scripts/**/*.js', '!scripts/min/*.js'],
				tasks: ['uglify']
			}
		}
	});


	// DEPENDENT PLUGINS =========================/

 	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');


	// TASKS =====================================/

	grunt.registerTask('default', ['compass:dev', 'uglify', 'watch']);
};