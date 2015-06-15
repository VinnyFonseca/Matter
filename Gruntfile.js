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
			            'styles/build.css': 'styles/build.scss'
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
					cwd: 'styles',
					src: '{,*/}*.css',
					dest: 'styles',
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
					sourceMapName: 'scripts/build.js.map'
				},
				files: {
					'scripts/build.js': [
						'scripts/core/engine/jquery-1.11.2.js',
						'scripts/core/engine/modernizr-latest.js',
						'scripts/core/engine/device.js',
						'scripts/dev/config.js',
						'scripts/core/polyfills/*.js',
						'scripts/core/vendor/*.js',
						'scripts/core/widgets/*.js',
						'scripts/core/*.js',
						'scripts/dev/**/*.js',
						'!scripts/core/debug/*.js'
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
					'scripts/build.js',
					'scripts/core/engine/**/*.js',
					'scripts/core/debug/**/*.js',
					'scripts/core/polyfills/**/*.js',
					'scripts/core/vendor/**/*.js'
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
			files: ['scripts/**/*.js']
		},


		// Config for grunt-browser-sync (browser synchronisation and auto-reloader)

		browserSync: {
			dist: {
				files: {
					src: [
						"**/*.html",
						"**/*.php",
						"img/**/*.*",
						"styles/build.css",
						"scripts/build.js"
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
				files: ['*.html, **/*.html']
			},
			php: {
				options: { livereload: true },
				files: ['*.php, **/*.php']
			},
			css: {
				options: { livereload: true },
				files: ['**/*.css']
			},
			sass: {
				options: { livereload: false },
				files: ['styles/**/*.{scss,sass}'],
				tasks: ['sass', 'autoprefixer']
			},
			js: {
				options: { livereload: true },
				files: ['scripts/**/*.js', '!scripts/*.js'],
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