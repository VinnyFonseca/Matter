'use strict';

var gulp    = require('gulp');
var config  = require('../config').sync;
var watch   = require('../config').watch;

var sync    = require('browser-sync').create();

gulp.task('sync', function() {
	sync.init(config.src, config.options);
});

gulp.task('reload', function() {
	sync.reload({once: true});
});

gulp.task('inject', function() {
	sync.reload({once: true, stream: true});
});