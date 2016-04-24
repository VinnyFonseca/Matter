'use strict';

var src   = 'app';
var dest  = 'dist';
var sync  = require('browser-sync').create();


module.exports = {
	src: src,
	dest: dest,


	// dist removal

	clean: {
		build: dest
	},


	// file and folders copying

	copy: {
		options: {
			dot: true,
			base: src
		},
		src: [
			src + '/**',
			'!' + src + '/markup/**',
			'!' + src + '/scripts/**/*.js',
			'!' + src + '/styles/**/*.{scss,sass}',
			'!' + src + '/img/**/*.{jpg,png,gif}'
		],
		dest: dest,
		tasks: ['copy']
	},


	// html injection

	include: {
		src: src + '/markup/**/*.html',
		dest: dest,
		tasks: ['include']
	},


	// image compression

	images: {
		src: src + '/img/**/*.{jpg,png,gif}',
		dest: dest + '/img',
		tasks: ['images']
	},


	// style compilation

	styles: {
		pre: {
			options: {
				precision: 2,
				sourceMap: false,
				sourceComments: false,
				outputStyle: global.isProd ? 'compressed' : 'expanded'
			}
		},
		post: {
			options: {
				map: false
			},
			processors: [
				require('rucksack-css')({
					fallbacks: true
				}),
				require('pixrem')({
					rootValue: 17, // Value is the same as on _config.scss $fontSize variable multiplied by 10.
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
		src: src + '/styles/**/*.{scss,sass}',
		dest: dest + '/styles',
		tasks: ['styles']
	},


	// script compilation

	scripts: {
		options: {
			mangle: global.isProd,
			beautify: false,
			sourceMap: true,
			sourceMapIncludeSources: true
		},
		concat: {
			src: [
				src + '/scripts/matter/base/**/*.js',
				src + '/scripts/matter/vendor/**/*.js',
				src + '/scripts/matter/polyfills/**/*.js',
				src + '/scripts/matter/config/**/*.js',
				src + '/scripts/matter/widgets/**/*.js',
				src + '/scripts/matter/system/**/*.js',
				src + '/scripts/matter/core/**/*.js',
				src + '/scripts/user/**/*.js'
			],
			filename: 'build.js',
			dest: dest + '/scripts',
			tasks: ['scripts-concat', 'scripts-hint']
		},
		noconcat: {
			src: [
				src + '/scripts/**/*.js',
				'!' + src + '/scripts/matter/**/*.js',
				'!' + src + '/scripts/user/**/*.js'
			],
			dest: dest + '/scripts',
			tasks: ['scripts-noconcat', 'scripts-hint']
		},
		hint: {
			options: {
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
			src: src + '/scripts/**/*.js'
		}
	},


	// browser synchronisation

	sync: {
		src: dest + '/**',
		options: {
			server: {
				baseDir: dest,
			},
			open: true,
			watchTask: false, // < VERY important
			reloadDelay: 50,
			reloadOnRestart: true,
			logLevel: 'info',
			logPrefix: 'Matter'
		}
	}
};
