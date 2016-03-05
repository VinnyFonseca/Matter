'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		// Config for grunt-notify

		notify: {
			ssi: {
				options: {
					title: 'Server Side Includes',
					message: 'Compilation completed'
				}
			},
			sass: {
				options: {
					title: 'SASS',
					message: 'Preprocessing completed'
				}
			},
			postcss: {
				options: {
					title: 'PostCSS',
					message: 'Postprocessing completed'
				}
			},
			styledocco: {
				options: {
					title: 'Style Docco',
					message: 'Styleguide created'
				}
			},
			jshint: {
				options: {
					title: 'JS Hint',
					message: 'Hinting completed'
				}
			},
			uglify: {
				options: {
					title: 'JS Uglify',
					message: 'Uglification completed'
				}
			},
			browserSync: {
				options: {
					title: 'BrowserSync',
					message: 'Process started'
				}
			},
			watch: {
				options: {
					title: 'Watch',
					message: 'Process started'
				}
			}
		},



		// Config for grunt-ssi

		ssi: {
			options: {
				cache: 'all',
				baseDir: 'app/markup'
			},
			main: {
				files: [{
					expand: true,
					cwd: 'app/markup',
					src: ['**/*.html', '!include/**/*.html'],
					dest: 'www'
				}]
			}
		},



		// Config for grunt-sass (libsass, ~4s compiling time)

		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'expanded'
			},
			main: {
				files: [{
			        expand: true,
			        cwd: 'app/styles',
			        src: ['**/*.{scss,sass}', '!**/_*.{scss,sass}'],
			        dest: 'www/styles',
			        filter: 'isFile',
			        ext: '.css'
			    }]
			}
		},


		// Config for grunt-postcss (multiple sass post processors, minification, autoprefixing)

		postcss: {
			options: {
				safe: true,
				map: true,
				processors: [
					require('rucksack-css')({
						fallbacks: true
					}),
					require('pixrem')(16, { // Value is the same as on _config.scss $fontSize variable multiplied by 10.
						html: true,
						replace: false,
						atrules: true,
						browsers: ['last 3 versions', '> 2%', 'ie 8', 'ie 7']
					}),
					require('autoprefixer')({
						browsers: ['last 3 versions', '> 2%', 'ie 8', 'ie 7']
					})
				]
			},
			main: {
				src: 'www/styles/build.css'
			}
		},


		// Config for styledocco (CSS style guides automatic generation)

		styledocco: {
			main: {
				options: {
					name: 'Matter',
					cmd: './node_modules/.bin/styledocco',
					preprocessor: 'sass'
				},
				files: {
					'styleguide': 'app/styles'
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
					'app/scripts/matter/polyfills/**/*.js'
				],
				'-W001': false,

				// Enforcing
				notypeof: true,
				nonbsp: true,
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


		// Config for grunt-contrib-uglify (javascript concatenation)

		uglify: {
			options: {
				mangle: true,
				beautify: false,
				sourceMap: true,
				sourceMapIncludeSources: true,
				sourceMapName: 'www/scripts/build.js.map'
			},
			main: {
				files: {
					'www/scripts/build.js': [
						'app/scripts/matter/base/**/*.js',
						'app/scripts/matter/engine/**/*.js',
						'app/scripts/matter/polyfills/**/*.js',
						'app/scripts/matter/config/**/*.js',
						'app/scripts/matter/widgets/**/*.js',
						'app/scripts/matter/system/**/*.js',
						'app/scripts/matter/core/**/*.js',
						'app/scripts/custom/**/*.js'
					]
				}
			}
		},



		// Config for grunt-browser-sync (browser synchronisation and auto-reloader)

		browserSync: {
			options: {
				server: {
					baseDir: "www"
				},
				open: true,
				watchTask: true, // < VERY important
				reloadDelay: 100,
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
			grunt: {
				options: { reload: true },
				files: ['Gruntfile.js']
			},
			html: {
				options: { livereload: 31337 },
				files: ['app/markup/**/*.html'],
				tasks: ['ssi', 'notify:ssi']
			},
			php: {
				options: { livereload: 31337 },
				files: ['www/**/*.php']
			},
			css: {
				options: { livereload: 31337 },
				files: ['www/**/*.css']
			},
			sass: {
				options: { livereload: false },
				files: ['app/styles/**/*.{scss,sass}'],
				tasks: ['sass', 'notify:sass', 'postcss', 'notify:postcss']
			},
			js: {
				options: { livereload: 31337 },
				files: ['app/scripts/**/*.js'],
				tasks: ['uglify', 'notify:uglify', 'jshint', 'notify:jshint']
			}
		}
	});


	// DEPENDENT PLUGINS =========================/

	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-ssi');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-styledocco');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');


	// TASKS =====================================/

	grunt.registerTask('default', [
		'ssi',
		'notify:ssi',
		'sass',
		'notify:sass',
		'postcss',
		'notify:postcss',
		'styledocco',
		'notify:styledocco',
		'jshint',
		'notify:jshint',
		'uglify',
		'notify:uglify',
		'browserSync',
		'notify:browserSync',
		'watch',
		'notify:watch'
	]);
};
