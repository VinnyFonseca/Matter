'use strict';

var gulp         = require('gulp');
var runSequence  = require('run-sequence');

gulp.task('deploy', function() {
	global.isProd = true;
	runSequence('clean', 'copy', 'include', 'images', 'styles', 'scripts');
});

// Assign a shortcut task to production
gulp.task('deploy', ['deploy']);