'use strict';

var gulp         = require('gulp');
var runSequence  = require('run-sequence');

gulp.task('development', ['clean'], function() {
	global.isProd = false;
	runSequence('copy', 'include', 'images', 'styles', 'scripts', 'watch');
});

// Assign the default task to development
gulp.task('default', ['development']);

// Assign a shortcut task to development
gulp.task('dev', ['development']);