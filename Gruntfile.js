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
					outputStyle: 'expanded'
				},
				files: {
					'www/styles/build.css': 'app/styles/build.scss'
				}
			}
		},


		// Config for grunt-postcss (multiple css post processors)

		postcss: {
			options: {
				safe: true,
				map: true,
				processors: [
					require('autoprefixer-core')({browsers: ['last 3 versions', '> 2%', 'ie 8', 'ie 7']}),
					require('cssnano')()
				]
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'app/styles',
					src: '{,*/}*.css',
					dest: 'www/styles',
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
					sourceMapName: 'www/scripts/build.js.map'
				},
				files: {
					'www/scripts/build.js': [
						'app/scripts/core/**/*.js',
						'app/scripts/dev/**/*.js',
						'!app/scripts/debug/**/*.js'
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
					'app/scripts/core/base/**/*.js',
					'app/scripts/core/engine/**/*.js',
					'app/scripts/core/polyfills/**/*.js',
					'app/scripts/core/vendor/**/*.js',
					'app/scripts/debug/**/*.js'
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
						"www/**/*.html",
						"www/**/*.php",
						"www/img/**/*.*",
						"www/styles/**/*.css",
						"www/scripts/**/*.js"
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
				files: ['www/**/*.html']
			},
			php: {
				options: { livereload: true },
				files: ['www/**/*.php']
			},
			css: {
				options: { livereload: true },
				files: ['www/**/*.css']
			},
			sass: {
				options: { livereload: false },
				files: ['app/styles/**/*.{scss,sass}'],
				tasks: ['sass', 'postcss']
			},
			js: {
				options: { livereload: true },
				files: ['app/scripts/**/*.js'],
				tasks: ['uglify', 'jshint']
			}
		}
	});


	// DEPENDENT PLUGINS =========================/

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');


	// TASKS =====================================/

	grunt.registerTask('default', [
		'sass',
		'postcss',
		'uglify',
		'jshint',
		'browserSync',
		'watch'
	]);
};