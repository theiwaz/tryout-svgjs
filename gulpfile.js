"use strict";
var gulp = require("gulp");
var open = require("gulp-open");
var connect = require("gulp-connect");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

var config = {
    port: 9090,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './source/*.html',
        dist: './dist',
        source: './source',
        mainJs: ['./source/main.js'],
        js: ['./source/*.js'],
        css: ['./source/*.css'],
        assets: ['./image-assets/**/*.png']
    }
};

// Imagemin images and ouput them in dist
gulp.task('imagemin', function() {
    gulp.src(config.paths.assets)
        .pipe(imagemin())
        .pipe(gulp.dest(config.paths.dist + '/images/'));
});

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


gulp.task('browserify', function() {
    browserify(config.paths.mainJs)
        .bundle()
        .on('error', console.error.bind(console))
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
    gulp.watch(config.paths.js, ['browserify']);
    gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['imagemin', 'html', 'browserify', 'css', 'open', 'watch']);