const gulp = require('gulp');
const server = require('gulp-webserver');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
const minify = require('gulp-imagemin');

// enable sass compilation
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.sass')
    .pipe(sass().on('error', (err) => console.log(err)))
    .pipe(gulp.dest('./public/css/'))
});

// enable pug compilation
gulp.task('pug', function () {
  return gulp.src('./pug/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./public/'))
});

// enable js uglification
gulp.task('uglify', function() {
  return gulp.src('./js/**/*.js')
    .pipe(uglify().on('error', (err) => console.log(err)))
    .pipe(gulp.dest('./public/js/'))
});

// enable assets minification
gulp.task('minify', function() {
    return gulp.src('./assets/**/*')
    .pipe(minify([
      minify.gifsicle(), 
      minify.jpegtran(), 
      minify.optipng(), 
      minify.svgo()
    ]))
    .pipe(gulp.dest('./public/images/')) 
});

// Copy vendor files
gulp.task('vendor', function() {
    return gulp.src('./bower_components/**/*')
      .pipe(gulp.dest('./public/bower_components/'))
});

// create our webserver
gulp.task('webserver', function () {
  return gulp.src('./public')
    .pipe(server({
      livereload: true,
      port: 8002
    }))
});

gulp.task('init', function() {
      gulp.watch('./sass/**/*.sass', ['sass']);
      gulp.watch('./pug/**/*.pug', ['pug']);
      gulp.watch('./js/**/*.js', ['uglify']);
      gulp.watch('./assets/**/*', ['minify']);
});

gulp.task('default', function() {
  return gulp.start('init', 'webserver');
});

