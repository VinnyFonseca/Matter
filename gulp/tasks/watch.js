'use strict';

var gulp    = require('gulp');
var config  = require('../config');
var sync    = require('browser-sync');

gulp.task('watch', ['sync'], function() {
	gulp.watch(config.copy.src, config.copy.tasks);
	gulp.watch(config.include.src, config.include.tasks);
	gulp.watch(config.images.src, config.images.tasks);
	gulp.watch(config.styles.src, config.styles.tasks);
	gulp.watch(config.scripts.single.src, config.scripts.single.tasks);
  gulp.watch(config.scripts.bundle.src, config.scripts.bundle.tasks);
});