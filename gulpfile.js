'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

gulp.task('sass', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass:prod', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
    // .pipe(browserSync.reload({stream: true}));
});

gulp.task('css:min', function () {
    gulp.src(['./build/css/*.css'])
        .pipe(concat('styles.min.css'))
        // .pipe(minifyCSS({
        //     keepBreaks: true
        // }))
        .pipe(gulp.dest('./build/css'))
});

gulp.task('css:prod', ['sass:prod', 'css:min']);

gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watcher', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./*.html', ['html'])
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: "./"
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('default', ['watcher', 'browserSync']);