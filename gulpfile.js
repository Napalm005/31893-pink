"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require('browser-sync');
var notify = require("gulp-notify");


gulp.task("style", function() {
  return gulp.src("less/style.less")
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: "last 2 versions"})
    ]))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream())
    .pipe(notify("Hello Gulp!"));
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task("start", ["style", "server"], function() {
  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("./*.html").on('change', browserSync.reload);
});


// Оставьте эту строку в самом конце файла
require("./.gosha");




