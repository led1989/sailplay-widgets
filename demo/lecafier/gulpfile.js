(function () {

  'use strict';

  var gulp = require('gulp');
  var concat = require('gulp-concat');
  var ngAnnotate = require('gulp-ng-annotate');
  var less = require('gulp-less');
  var path = require('path');
  var ngHtml2Js = require("gulp-ng-html2js");
  var minifyHtml = require("gulp-minify-html");
  var imagemin = require('gulp-imagemin');
  var browserSync = require('browser-sync').create();

  gulp.task('connect', function () {

    browserSync.init({
      server: "./",
      host: '0.0.0.0',
      open: false
    });

  });

  gulp.task('watch', function () {
    gulp.watch(__dirname + '/src/js/**/*.js', ['build.javascript']);
    gulp.watch(__dirname + '/src/html/**/*.html', ['build.javascript']);
    gulp.watch(__dirname + '/src/less/**/*.less', ['build.less']);
    gulp.watch(__dirname + '/src/fonts/**/*', ['build.fonts']);
    //gulp.watch(__dirname + '/src/*.html', ['build.html']);
    gulp.watch(__dirname + '/src/images/**/*', ['build.images']);
    gulp.watch(__dirname + '/src/json/**/*', ['build.json']);
  });

  gulp.task('build.javascript', ['javascript.concat', 'javascript.ngAnnotate']);

  gulp.task('javascript.concat', ['build.templates'], function () {
    return gulp.src([
        __dirname + '/node_modules/jquery/dist/jquery.min.js',
        __dirname + '/node_modules/sailplay-hub/sailplay.hub.js',
        __dirname + '/node_modules/sailplay-hub-actions/sailplay.hub.actions.js',
        __dirname + '/node_modules/angular/angular.min.js',
        __dirname + '/node_modules/angular-cookie/angular-cookie.min.js',
        __dirname + '/node_modules/angular-utils-pagination/dirPagination.js',
        __dirname + '/src/js/**/**/*.js'
      ])
      .pipe(concat('sailplay.lecafier.js'))
      .pipe(gulp.dest(__dirname + '/dist/js/'));
  });

  gulp.task('javascript.ngAnnotate', ['javascript.concat'], function () {
    return gulp.src(__dirname + '/dist/js/sailplay.lecafier.js')
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(gulp.dest(__dirname + '/dist/js/'));
  });


  gulp.task('build.templates', function () {
    return gulp.src(__dirname + '/src/html/**/*.html')
      .pipe(minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe(ngHtml2Js({
        moduleName: "templates",
        prefix: "/html/"
      }))
      .pipe(concat("html.min.js"))
      .pipe(gulp.dest("./src/js/"));
  });


  gulp.task('build.less', function () {
    return gulp.src(__dirname + '/src/less/sailplay.lecafier.less')
      .pipe(less({
        paths: [path.join(__dirname, 'less', 'includes')]
      }))
      .pipe(gulp.dest(__dirname + '/dist/css/'));
  });

  gulp.task('build.fonts', function () {
    return gulp.src(__dirname + '/src/fonts/**/*')
      .pipe(gulp.dest(__dirname + '/dist/fonts'));
  });

  gulp.task('build.images', function () {
    return gulp.src(__dirname + '/src/images/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest(__dirname + '/dist/images'));
  });

  //gulp.task('build.html', function () {
  //  return gulp.src(__dirname + '/src/*.html')
  //    .pipe(gulp.dest(__dirname + '/dist/'));
  //});

  gulp.task('default', ['connect', 'watch', 'build.javascript', 'build.less', 'build.images', 'build.fonts']);

  gulp.task('build', ['build.javascript', 'build.less', 'build.images', 'build.fonts']);

}());