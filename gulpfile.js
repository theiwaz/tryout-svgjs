"use strict";
var gulp = require("gulp");
var open = require("gulp-open");
var connect = require("gulp-connect");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

var config = {
    port: 9090,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './source/*.html',
        dist: './dist',
        js: ['./source/*.js'],
        mainJs: './source/main.js',
        mainCss: './source/main.css',
        css: ['./node_modules/jquery-ui-dist/*.min.css', './d3-floorplan/**/*.css', './source/*.css']
    }
};

gulp.task('connect', function() {

    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function() {
    gulp.src('dist/index.html')
        .pipe(open({
            uri: config.devBaseUrl + ':' + config.port + '/'
        }));
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    browserify(config.paths.mainJs)
        .bundle()
        //.on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('main.css'))
        .pipe(gulp.dest(config.paths.dist + '/styles'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'js', 'css', 'open', 'watch']);