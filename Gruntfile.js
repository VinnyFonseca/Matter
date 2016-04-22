'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		// Config for grunt-notify

		notify: {
			clean: {
				options: {
					title: 'Build Cleanup',
					message: 'Cleaning completed'
				}
			},
			copy: {
				options: {
					title: 'Copy app/ to dist/',
					message: 'Copy completed'
				}
			},
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
					title: 'Styledocco',
					message: 'Styleguide created'
				}
			},
			uglify: {
				options: {
					title: 'JS Uglify',
					message: 'Uglification completed'
				}
			},
			jshint: {
				options: {
					title: 'JS Hint',
					message: 'Hinting completed'
				}
			},
			imagemin: {
				options: {
					title: 'Image Compression',
					message: 'Compression completed'
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



		// Config for grunt-contrib-clean (directory cleaning)

		clean: {
			build: ["dist"]
		},



		// Config for grunt-contrib-copy (file and folder copy)

		copy: {
			main: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'app',
					src: [
						'**',
						'!**/markup/**',
						'!**/scripts/**/*.js',
						'!**/styles/**/*.{scss,sass}',
						'!img/**/*.{jpg,png,gif}'
					],
					dest: 'dist'
				}]
			}
		},



		// Config for grunt-ssi (server-side includes injection)

		ssi: {
			options: {
				cache: 'all',
				cacheDir: '.ssi',
				baseDir: 'app/markup'
			},
			main: {
				files: [{
					expand: true,
					cwd: 'app/markup',
					src: [
						'**/*.html',
						'!_partials/**/*.html'
					],
					dest: 'dist'
				}]
			}
		},



		// Config for grunt-sass (libsass, ~4s compiling time)

		sass: {
			options: {
				sourceMap: false,
				outputStyle: 'compressed'
			},
			main: {
				files: [{
					expand: true,
					cwd: 'app/styles',
					src: '**/*.{scss,sass}',
					dest: 'dist/styles',
					filter: 'isFile',
					ext: '.css'
				}]
			}
		},


		// Config for grunt-postcss (multiple sass post processors, minification, autoprefixing)

		postcss: {
			options: {
				safe: true,
				map: false,
				processors: [
					require('rucksack-css')({
						fallbacks: true
					}),
					require('pixrem')({
						rootValue: 17, // Value is the same as on /app/styles/matter/_config.scss $fontSize variable multiplied by 10.
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
				src: 'dist/styles/**/*.css'
			}
		},


		// Config for grunt-contrib-uglify (javascript concatenation)

		uglify: {
			options: {
				mangle: true,
				beautify: false,
				sourceMap: true,
				sourceMapIncludeSources: true
			},
			concat: {
				files: [{
					src: [
						'app/scripts/matter/base/**/*.js',
						'app/scripts/matter/vendor/**/*.js',
						'app/scripts/matter/polyfills/**/*.js',
						'app/scripts/matter/config/**/*.js',
						'app/scripts/matter/widgets/**/*.js',
						'app/scripts/matter/system/**/*.js',
						'app/scripts/matter/core/**/*.js',
						'app/scripts/user/**/*.js'
					],
					dest: 'dist/scripts/build.js'
				}]
			},
			noconcat: {
				files: [{
					expand: true,
					cwd: 'app/scripts',
					src: [
						'**/*.js',
						'!matter/**/*.js',
						'!user/**/*.js'
					],
					dest: 'dist/scripts'
				}]
			}
		},


		// Config for grunt-contrib-jshint (javascript lint)

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				force: true,
				ignores: [
					'app/scripts/debug/**/*.js',
					'app/scripts/standalone/**/*.js',
					'app/scripts/matter/base/**/*.js',
					'app/scripts/matter/vendor/**/*.js',
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
			files: 'app/scripts/**/*.js'
		},



		// Config for grunt-contrib-imagemin (image compression)

		imagemin: {
			main: {
				files: [{
					expand: true,
					cwd: 'app/img',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/img'
				}]
			}
		},



		// Config for grunt-browser-sync (browser synchronisation and auto-reloader)

		browserSync: {
			options: {
				server: {
					baseDir: "dist"
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
						"dist/**/*.html",
						"dist/**/*.php",
						"dist/img/**/*.*",
						"dist/styles/**/*.css",
						"dist/scripts/**/*.js"
					]
				}
			}
		},


		// Config for grunt-contrib-watch (overseer)

		watch: {
			options: {
				livereload: true,
				event: ['changed', 'added', 'deleted']
			},
			grunt: {
				options: { reload: true },
				files: ['Gruntfile.js']
			},
			files: {
				files: [
					'**',
					'!**/markup/**',
					'!**/scripts/**/*.js',
					'!**/styles/**/*.{scss,sass}',
					'!img/**/*.{jpg,png,gif}'
				],
				tasks: ['newer:copy', 'notify:copy']
			},
			html: {
				files: ['app/**/*.html'],
				tasks: ['newer:ssi', 'notify:ssi']
			},
			php: {
				files: ['app/**/*.php']
			},
			css: {
				files: ['dist/styles/**/*.css']
			},
			sass: {
				options: { livereload: false },
				files: ['app/styles/**/*.{scss,sass}'],
				tasks: ['newer:sass', 'notify:sass', 'newer:postcss', 'notify:postcss']
			},
			js: {
				files: ['app/scripts/**/*.js'],
				tasks: ['newer:uglify', 'notify:uglify', 'newer:jshint', 'notify:jshint']
			},
			img: {
				files: ['app/img/**/*.*'],
				tasks: ['newer:imagemin', 'notify:imagemin']
			}
		}
	});


	// DEPENDENT PLUGINS =========================/

	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-ssi');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-openport');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');


	// TASKS =====================================/

	grunt.registerTask('default', [
		'clean',
		'notify:clean',
		'copy',
		'notify:copy',
		'ssi',
		'notify:ssi',
		'sass',
		'notify:sass',
		'postcss',
		'notify:postcss',
		'uglify',
		'notify:uglify',
		'jshint',
		'notify:jshint',
		'imagemin',
		'notify:imagemin',
		'browserSync',
		'notify:browserSync',
		'openport:watch.options.livereload:35729:40000',
		'watch',
		'notify:watch'
	]);
};
