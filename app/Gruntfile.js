'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// CONFIG ===================================/

		// Config for grunt-sass (libsass, ~4s compiling time)

		sass: {
			dist: {
				options: {
					sourceMap: true,
					outputStyle: 'compressed'
				},
			        files: {
			            'web/styles/build.css': 'app/styles/build.scss'
			        }
			}
		},


		// Config for grunt-autoprefixer (avoid unnecessary mixin usage)

		autoprefixer: {
			dist: {
				options: {
					safe: true,
					map: true,
					browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7']
				},
				files: [{
					expand: true,
					cwd: 'app/styles',
					src: '{,*/}*.css',
					dest: 'web/styles',
					ext: '.css'
				}]
			}
		},


		// Config for grunt-contrib-uglify (javascript concatenation)

		uglify: {
			dist: {
				options: {
					beautify: false,
					sourceMap: true,
					sourceMapIncludeSources: true,
					sourceMapName: 'web/scripts/build.js.map'
				},
				files: {
					'web/scripts/build.js': [
						'app/scripts/core/engine/jquery-1.11.2.js',
						'app/scripts/core/engine/modernizr-latest.js',
						'app/scripts/core/engine/device.js',
						'app/scripts/dev/config.js',
						'app/scripts/core/polyfills/*.js',
						'app/scripts/core/vendor/*.js',
						'app/scripts/core/widgets/*.js',
						'app/scripts/core/*.js',
						'app/scripts/dev/**/*.js',
						'!app/scripts/core/debug/*.js'
					]
				}
			}
		},


		// Config for grunt-contrib-jshint (javascript lint)

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				force: true,
				ignores: [
					'app/scripts/core/engine/**/*.js',
					'app/scripts/core/debug/**/*.js',
					'app/scripts/core/polyfills/**/*.js',
					'app/scripts/core/vendor/**/*.js'
				],
				'-W001': false,

				// Enforcing
				notypeof: true,
				funcscope: true,
				unused: false,
				globals: {
					browser: true,
					devel: true,
					jQuery: true,
					console: true,
					document: true,
					module: true
				},

				// Relaxing
				asi: true,
				eqnull: true,
				loopfunc: true,
				multistr: true
			},
			files: ['app/scripts/**/*.js']
		},


		// Config for grunt-browser-sync (browser synchronisation and auto-reloader)

		browserSync: {
			dist: {
				files: {
					src: [
						"web/**/*.html",
						"web/**/*.php",
						"web/img/**/*.*",
						"web/styles/**/*.css",
						"web/scripts/**/*.js"
					]
				},
				options: {
					open: false,
					server: false,
					watchTask: true, // < VERY important
					reloadOnRestart: true,
					logLevel: "info",
					logPrefix: "Matter"
				}
			}
		},


		// Config for grunt-contrib-watch (overseer)

		watch: {
			html: {
				options: { livereload: true },
				files: ['web/**/*.html']
			},
			php: {
				options: { livereload: true },
				files: ['web/**/*.php']
			},
			css: {
				options: { livereload: true },
				files: ['web/**/*.css']
			},
			sass: {
				options: { livereload: false },
				files: ['app/styles/**/*.{scss,sass}'],
				tasks: ['sass', 'autoprefixer']
			},
			js: {
				options: { livereload: true },
				files: ['app/scripts/**/*.js'],
				tasks: ['uglify', 'jshint']
			}
		}
	});


	// DEPENDENT PLUGINS =========================/

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');


	// TASKS =====================================/

	grunt.registerTask('default', ['sass', 'autoprefixer', 'uglify', 'jshint', 'browserSync', 'watch']);
};