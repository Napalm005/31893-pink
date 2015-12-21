"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require('browser-sync');
var notify = require("gulp-notify");
var imageop = require('gulp-image-optimization');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');


gulp.task("style", function() {
  return gulp.src("./source/less/style.less")
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: "last 2 versions"})
    ]))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream())
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('./build/css'))
    .pipe(notify("Hello Gulp!"));
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './build/'
    }
  });
});

gulp.task('scripts', function() {
  return gulp.src(['./source/js/*.js', './vendor/*.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./build/js/'))
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('./build/js/'))
    .pipe(connect.reload());
});

gulp.task('images', function(cb) {
  gulp.src(['./source/img/**/*.png','./source/img/**/*.jpg','./source/img/**/*.gif','./source/img/**/*.jpeg','./source/img/**/*.svg']).pipe(imageop({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
  })).pipe(gulp.dest('./build/img')).on('end', cb).on('error', cb);
});

gulp.task('compress', function() {
  gulp.src('./source/img/**/')
  .pipe(imagemin({
      progressive: true
  }))
  .pipe(gulp.dest('./build/img/'))
});

gulp.task('clean', function () {
  return gulp.src('./build/*', {read: false})
    .pipe(clean());
});

gulp.task('copy', function () {
  gulp.src(['./source/img/**/*.png','./source/img/**/*.jpg','./source/img/**/*.gif','./source/img/**/*.jpeg','./source/img/**/*.svg'])
    .pipe(gulp.dest('./build/img/'))
  gulp.src('./source/*.html')
    .pipe(gulp.dest('./build/'))
});

gulp.task('connect', function() {
  connect.server({
    root:'./build/',
    livereload: false,
    port: 8080
  })
});

gulp.task('html', function () {
  gulp.src('./source/*.html')
    .pipe(gulp.dest('./build/'))
 gulp.src('./build/*.html')
    .pipe(connect.reload());
});


// gulp.task("start", ["style", "server"], function() {
//   gulp.watch("./source/less/**/*.less", ["style"]);
//   gulp.watch("./source/*.html").on('change', browserSync.reload);
// });

gulp.task("watch", ["style", "server"], function() {
  gulp.watch("./source/less/**/*.less", ["style"]);
  gulp.watch('./source/js/*.js', ['scripts']);
  gulp.watch("./build/*.html").on('change', browserSync.reload);
});

gulp.task('default', function() {
  runSequence(
    'clean',
    'copy',
    'compress',
    'style',
    'watch'
  );
});


// Оставьте эту строку в самом конце файла
require("./.gosha");




