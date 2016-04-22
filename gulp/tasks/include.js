'use strict';

var config    = require('../config').include;

var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var handler   = require('../util/handleErrors');

var ignorer   = require('gulp-ignore');
var newer     = require('gulp-newer');
var includer  = require('gulp-file-include');
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
		.pipe(ignorer.exclude(config.ignore))
		.pipe(includer(config.options))
		.pipe(newer(config.dest))
		.pipe(gulp.dest(config.dest))
		.pipe(sync.stream({once: true}));
});
