'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var ejsify = require('ejsify');

gulp.task('bundle', function() {
	return browserify({
		entries: ['public/src/js/app.js'],
		debug: true,
		transform: [ejsify]
	}).bundle()
	.on('error', function(error) {
    console.log(error.toString());
    this.emit('end');
  })
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(gulp.dest('public/js/'));
});

gulp.task('sass', function () {
  return gulp.src('./public/src/scss/app.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
	gulp.watch('public/src/js/**/*.js', ['bundle']);
	gulp.watch('public/src/js/**/*.ejs', ['bundle']);
	gulp.watch('public/src/scss/**/*.scss', ['sass']);
});

gulp.task('build', ['bundle', 'sass']);
gulp.task('default', ['build', 'watch']);
