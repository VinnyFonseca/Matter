'use strict';

var input   = 'app';
var output  = 'dist';
var sync  = require('browser-sync').create();


module.exports = {
	src: input,
	dest: output,


	// dist removal

	clean: {
        options: {
            force: true
        },
		dest: output
	},


	// file and folders copying

	copy: {
		options: {
			dot: true,
			base: input
		},
		src: [
			input + '/**',
			'!' + input + '/markup/**',
			'!' + input + '/scripts/**/*.js',
			'!' + input + '/styles/**/*.{scss,sass}',
			'!' + input + '/img/**/*.{jpg,png,gif}'
		],
		dest: output,
		tasks: ['copy']
	},


	// html injection

	include: {
		src: input + '/markup/**/*.html',
		dest: output,
		tasks: ['include']
	},


	// image compression

	images: {
		src: input + '/img/**/*.{jpg,png,gif}',
		dest: output + '/img',
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
			options: {},
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
		src: input + '/styles/**/*.{scss,sass}',
		dest: output + '/styles',
		tasks: ['styles']
	},


	// script compilation

	scripts: {
		uglify: {
			mangle: global.isProd,
			beautify: false,
			sourceMap: true,
			sourceMapIncludeSources: true
		},
    single: {
      src: [
        input + '/scripts/**/*.js',
        '!' + input + '/scripts/matter/**/*.js',
        '!' + input + '/scripts/user/**/*.js'
      ],
      dest: output + '/scripts',
      tasks: ['scripts-single', 'scripts-hint']
    },
		bundle: {
			src: [
				input + '/scripts/matter/base/**/*.js',
				input + '/scripts/matter/vendor/**/*.js',
				input + '/scripts/matter/polyfills/**/*.js',
				input + '/scripts/matter/config/**/*.js',
				input + '/scripts/matter/widgets/**/*.js',
				input + '/scripts/matter/system/**/*.js',
				input + '/scripts/matter/core/**/*.js',
				input + '/scripts/user/**/*.js'
			],
			filename: 'build.js',
			dest: output + '/scripts',
			tasks: ['scripts-bundle', 'scripts-hint']
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
			src: input + '/scripts/**/*.js'
		},
    transpile: {
      compact: false,
      presets: ['es2015', 'es2017', 'react'],
      plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties'],
    }
	},


	// browser synchronisation

	sync: {
		src: output + '/**',
		options: {
			server: {
				baseDir: output,
			},
			open: false,
			watchTask: false, // < VERY important
			reloadDelay: 50,
			reloadOnRestart: true,
			logLevel: 'info',
			logPrefix: 'Matter'
		}
	}
};
