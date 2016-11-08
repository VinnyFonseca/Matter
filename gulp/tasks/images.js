'use strict';

var config    = require('../config').images;

var gulp      = require('gulp');
var gutil     = require('gulp-util');
var notify    = require('gulp-notify');
var plumber   = require('gulp-plumber');

var newer     = require('gulp-newer');
var imagemin  = require('gulp-imagemin');
var pngquant  = require('imagemin-pngquant');
var sync      = require('browser-sync').create();

gulp.task('images', function() {
	return gulp.src(config.src)
        .pipe(plumber(function(error) {
            gutil.log(error.message);
            notify(error.message);
            this.emit('end');
        }))
		.pipe(newer(config.dest))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(config.dest))
		.pipe(sync.stream({once: true}));
});
