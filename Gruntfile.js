'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		// Config for grunt-ssi

		ssi: {
			options: {
				cache: 'all',
				ext: '.html',
				baseDir: 'app/markup',
                cacheDir: '.ssi-cache'
			},
			main: {
				files: [{
					expand: true,
					cwd: 'app/markup',
					src: ['*.html'],
					dest: 'www',
				}],
			},
		},


		// Config for grunt-sass (libsass, ~4s compiling time)

		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
			main: {
				files: {
					'www/styles/build.css': 'app/styles/build.scss'
				}
			}
		},


		// Config for grunt-postcss (multiple css post processors, minification, autoprefixing)

		postcss: {
			options: {
				safe: true,
				map: true,
				processors: [
					require('rucksack-css')(),
					require('autoprefixer')({
						browsers: ['last 3 versions', '> 2%', 'ie 8', 'ie 7']
					})
				]
			},
			main: {
				src: 'www/styles/build.css'
			}
		},


		// Config for grunt-contrib-uglify (javascript concatenation)

		uglify: {
			options: {
				beautify: true,
				sourceMap: true,
				sourceMapIncludeSources: true,
				sourceMapName: 'www/scripts/build.js.map'
			},
			main: {
				files: {
					'www/scripts/build.js': [
						'app/scripts/matter/**/*.js',
						'app/scripts/custom/**/*.js'
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
					'app/scripts/matter/base/**/*.js',
					'app/scripts/matter/engine/**/*.js',
					'app/scripts/matter/polyfills/**/*.js',
					'app/scripts/matter/vendor/**/*.js'
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
				expr: true,
				eqnull: true,
				loopfunc: true,
				multistr: true,
				scripturl: true
			},
			files: ['app/scripts/**/*.js']
		},


		// Config for grunt-browser-sync (browser synchronisation and auto-reloader)

		browserSync: {
			options: {
				server: {
					baseDir: "www"
				},
				open: true,
				watchTask: true, // < VERY important
				reloadOnRestart: true,
				logLevel: "info",
				logPrefix: "Matter"
			},
			main: {
				files: {
					src: [
						"www/**/*.html",
						"www/**/*.php",
						"www/img/**/*.*",
						"www/styles/**/*.css",
						"www/scripts/**/*.js"
					]
				}
			}
		},


		// Config for grunt-contrib-watch (overseer)

		watch: {
			html: {
				options: { livereload: true },
				files: ['app/markup/**/*.html'],
				tasks: ['ssi']
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

	grunt.loadNpmTasks('grunt-ssi');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');


	// TASKS =====================================/

	grunt.registerTask('default', [
		'ssi',
		'sass',
		'postcss',
		'uglify',
		'jshint',
		'browserSync',
		'watch'
	]);
};