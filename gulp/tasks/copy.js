'use strict';

var config       = require('../config').copy;

var gulp         = require('gulp');
var gutil        = require('gulp-util');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');

var newer        = require('gulp-newer');
var eventStream  = require('event-stream');
var sync         = require('browser-sync').create();

var onlyDirs = function(stream) {
	return stream.map(function(file, callback) {
		if (file.stat.isFile()) {
			return callback(null, file);
		} else {
			return callback();
		}
	});
};

gulp.task('copy', function() {
    return gulp.src(config.src, config.options)
        .pipe(plumber(function(error) {
            gutil.log(error.message);
            notify(error.message);
            this.emit('end');
        }))
		.pipe(newer(config.dest))
        .pipe(onlyDirs(eventStream))
        .pipe(gulp.dest(config.dest))
		.pipe(sync.stream({once: true}));
});