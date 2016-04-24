'use strict';

var config    = require('../config').include;

var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var handler   = require('../util/handleErrors');

var includer  = require('gulp-html-ssi');
var notify    = require('gulp-notify');
var sync      = require('browser-sync').create();

gulp.task('include', function() {
	gulp.src(config.src)
    	.pipe(plumber())
		.on('error', function() {
			handler;
			notify.onError().apply(this, arguments);
			this.emit('end');
		})
		.pipe(includer())
		.pipe(gulp.dest(config.dest))
		.pipe(sync.stream({once: true}));
});
