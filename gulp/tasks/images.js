'use strict';

var config    = require('../config').images;

var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var handler   = require('../util/handleErrors');

var newer     = require('gulp-newer');
var imagemin  = require('gulp-imagemin');
var pngquant  = require('imagemin-pngquant');
var notify    = require('gulp-notify');
var sync      = require('browser-sync').create();

gulp.task('images', function() {
	return gulp.src(config.src)
    	.pipe(plumber())
		.on('error', function() {
			handler;
			notify.onError().apply(this, arguments);
			this.emit('end');
		})
		.pipe(newer(config.dest))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(config.dest))
		.pipe(sync.stream({once: true}));
});
