'use strict';

var config  = require('../config').clean;

var gulp    = require('gulp');

var del     = require('del');

gulp.task('clean', function() {
	del(config.build);
});

gulp.task('clean-partials', function() {
	del(config.partials);
});
