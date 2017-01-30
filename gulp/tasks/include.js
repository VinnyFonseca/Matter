'use strict';

var config    = require('../config').include;

var gulp      = require('gulp');
var gutil     = require('gulp-util');
var notify    = require('gulp-notify');
var plumber   = require('gulp-plumber');

// var includer  = require('gulp-html-ssi');
var includer  = require('gulp-ssi');
var sync      = require('browser-sync').create();

gulp.task('include', function() {
	return gulp.src(config.src)
    .pipe(plumber(function(error) {
      gutil.log(error.message);
      notify(error.message);
      this.emit('end');
    }))
  	.pipe(includer())
  	.pipe(gulp.dest(config.dest))
  	.pipe(sync.stream({once: true}));
});