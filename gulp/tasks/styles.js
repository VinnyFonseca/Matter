'use strict';

var config        = require('../config').styles;

var gulp          = require('gulp');
var plumber       = require('gulp-plumber');
var handler       = require('../util/handleErrors');

var newer         = require('gulp-newer');
var sass          = require('gulp-sass');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var pixrem        = require('pixrem');
var rucksack      = require('rucksack-css');
var maps          = require('gulp-sourcemaps');
var notify        = require('gulp-notify');
var sync          = require('browser-sync').create();

var processors = [
	rucksack({
		fallbacks: true
	}),
	pixrem({
		rootValue: 17, // Value is the same as on _config.scss $fontSize variable multiplied by 10.
		html: true,
		replace: false,
		atrules: true,
		browsers: ['last 3 versions', '> 2%', 'ie 8']
	}),
    autoprefixer({
    	browsers: ['last 3 versions', '> 2%', 'ie 8']
    })
];

gulp.task('styles', function () {
	return gulp.src(config.src)
    	.pipe(plumber())
		.on('error', function() {
			handler;
			notify.onError().apply(this, arguments);
			this.emit('end');
		})
		.pipe(newer(config.src))
    	// .pipe(maps.init())
			.pipe(sass(config.pre.options))
        	.pipe(postcss(config.post.processors, config.post.options))
    	// .pipe(maps.write('.'))
		.pipe(gulp.dest(config.dest))
		.pipe(sync.stream({match: config.dest + '/**/*.css'}));
});