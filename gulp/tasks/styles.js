'use strict';

var config        = require('../config').styles;

var gulp          = require('gulp');
var gutil         = require('gulp-util');
var notify        = require('gulp-notify');
var plumber       = require('gulp-plumber');

var newer         = require('gulp-newer');
var sass          = require('gulp-sass');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var rucksack      = require('rucksack-css');
var maps          = require('gulp-sourcemaps');
var sync          = require('browser-sync').create();

var processors = [
  rucksack({
    fallbacks: true
  }),
  autoprefixer({
    browsers: ['last 3 versions', '> 2%', 'ie 8']
  })
];

gulp.task('styles', function () {
  return gulp.src(config.src)
    .pipe(plumber(function(error) {
      gutil.log(error.message);
      notify(error.message);
      this.emit('end');
    }))
    .pipe(newer(config.src))
    .pipe(maps.init())
      .pipe(sass(config.pre.options))
      .pipe(postcss(config.post.processors, config.post.options))
    .pipe(maps.write('.'))
    .pipe(gulp.dest(config.dest))
    .pipe(sync.stream({match: config.dest + '/**/*.css'}));
});