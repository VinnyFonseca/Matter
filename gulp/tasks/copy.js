'use strict';

var config       = require('../config').copy;

var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var handler      = require('../util/handleErrors');

var newer        = require('gulp-newer');
var eventStream  = require('event-stream');
var notify       = require('gulp-notify');
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
    	.pipe(plumber())
		.on('error', function() {
			handler;
			notify.onError().apply(this, arguments);
			this.emit('end');
		})
		.pipe(newer(config.dest))
        .pipe(onlyDirs(eventStream))
        .pipe(gulp.dest(config.dest))
		.pipe(sync.stream({once: true}));
});