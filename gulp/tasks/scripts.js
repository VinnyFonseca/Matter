'use strict';

var config   = require('../config').scripts;

var gulp     = require('gulp');
var gutil    = require('gulp-util');
var notify   = require('gulp-notify');
var plumber  = require('gulp-plumber');

var newer    = require('gulp-newer');
var concat   = require('gulp-concat');
var uglify   = require('gulp-uglify');
var maps     = require('gulp-sourcemaps');
var sync     = require('browser-sync').create();


// JS Builds

gulp.task('scripts-concat', function() {
	return gulp.src(config.concat.src)
        .pipe(plumber(function(error) {
            gutil.log(error.message);
            notify(error.message);
            this.emit('end');
        }))
		.pipe(newer(config.concat.dest))
    	.pipe(maps.init())
			.pipe(concat(config.concat.filename))
			.pipe(global.isProd ? uglify(config.options) : gutil.noop())
    	.pipe(maps.write('.'))
		.pipe(gulp.dest(config.concat.dest))
		.pipe(sync.stream({once: true}));
});

gulp.task('scripts-noconcat', function() {
	return gulp.src(config.noconcat.src)
        .pipe(plumber(function(error) {
            gutil.log(error.message);
            notify(error.message);
            this.emit('end');
        }))
		.pipe(newer(config.noconcat.dest))
    	.pipe(maps.init())
			.pipe(global.isProd ? uglify(config.options) : gutil.noop())
    	.pipe(maps.write('.'))
		.pipe(gulp.dest(config.noconcat.dest))
		.pipe(sync.stream({once: true}));
});


// JS Hint

var jshint   = require('gulp-jshint');
var reporter = require('jshint-stylish');

gulp.task('scripts-hint', function() {
	return gulp.src(config.hint.src)
    	.pipe(plumber())
		.on('error', function() {
			handler;
			notify.onError().apply(this, arguments);
			this.emit('end');
		})
		.pipe(jshint(config.hint.options))
		.pipe(jshint.reporter(reporter));
});


// JS Task

gulp.task('scripts', ['scripts-concat', 'scripts-noconcat', 'scripts-hint']);
