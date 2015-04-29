var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber');

gulp.task('sass:app', function() {
    gulp.src(['scss/**/*.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('www/css'));
});

gulp.task('watch', function() {
    gulp.watch(['scss/**/*.scss'], ['sass:app']);
});