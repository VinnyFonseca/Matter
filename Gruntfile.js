'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// CONFIG ===================================/

		// Config for grunt-sass (Lacks compass, 3s compiling time)

		sass: {
			options: {
				sourceMap: true,
				sourceComments: false,
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'styles/build.css': 'styles/build.scss'
				}
			}
		},


		// Config for grunt-compass (10s compiling time)

		// compass: {
		// 	dist: {
		// 		src: 'styles',
		// 		dest: 'styles',
		// 		outputstyle: 'expanded',
		// 		linecomments: false
		// 	}
		// },


		// Config for grunt-contrib-compass (20s compiling time)

		// compass: {
		// 	dist: {
		// 		options: {
		// 			sassDir: ['styles'],
		// 			cssDir: ['styles'],
		// 			outputStyle: 'compressed',
		// 			sourcemap: true
		// 		}
		// 	}
		// },


		// Config for grunt-contrib-uglify (javascript concatenation)

		uglify: {
			all: {
				files: {
					'scripts/build.js': [
						'scripts/core/vendor/jquery-1.11.2.min.js',
						'scripts/core/vendor/modernizr-full.min.js',
						'scripts/core/vendor/frogaloop.js',
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


		// Config for grunt-autoprefixer (avoid unnecessary mixin usage)

		autoprefixer: {
			options: {
				browsers: ['> 1%', 'Explorer >= 7'],
				map: true
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'styles/',
					src: '{,*/}*.css',
					dest: 'styles/'
				}]
			}
		},


		// Config for grunt-contrib-watch (javascript concatenation)

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
				tasks: ['sass:dist', 'autoprefixer'],
				// tasks: ['compass:dist', 'autoprefixer'],
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

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-compass');
	// grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// TASKS =====================================/

	grunt.registerTask('default', ['watch']);
};