'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// CONFIG ===================================/

		compass: {
			dist: {
				options: {
					sassDir: ['styles'],
					cssDir: ['styles'],
					outputStyle: 'compressed',
					sourcemap: true
				}
			}
		},

		uglify: {
			all: {
				files: {
					'scripts/build.js': [
						'scripts/core/vendor/jquery-1.11.2.min.js',
						'scripts/core/vendor/modernizr-full.min.js',
						'scripts/core/vendor/*.js',
						'scripts/dev/config.js',
						'scripts/core/polyfills/*.js',
						'scripts/core/widgets/*.js',
						'scripts/core/*.js',
						'scripts/dev/*.js'
					]
				}
			},
			options: {
				beautify: false,
		        sourceMap: true,
				sourceMapIncludeSources: true,
		        sourceMapName: 'scripts/build.js.map'
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
				files: ['styles/*.{scss,sass}', 'styles/**/*.{scss,sass}'],
				tasks: ['compass:dist'],
				options: {
					livereload: false
				}
			},
			js: {
				files: ['scripts/**/*.js', '!scripts/*.js'],
				tasks: ['uglify'],
				options: { livereload: true	}
			}
		}
	});


	// DEPENDENT PLUGINS =========================/

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// TASKS =====================================/

	grunt.registerTask('default', ['watch']);
};