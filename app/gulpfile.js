var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var karma = require('gulp-karma');

var paths = {
    sass: ['./scss/**/*.scss']
};// Not sure if being used

var testFiles = [
    'test'
];

gulp.task('test', function () {
    sh.exec("karma start karma.conf.js");
});

gulp.task('default', ['sass']);

gulp.task('sass-system', function (done) {
    gulp.src('core/scss/ionic.app.scss')
        .pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('core/css/'))
        .on('end', done);
});

gulp.task('scss', function (done) {

    /* Application SCSS */
    gulp.src('scss/*')
        .pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('css/'))
        .on('end', done);

});

// Re do
gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

// Possible refactor
gulp.task('build-ios', function () {
    sh.exec("ionic build ios");
});

gulp.task('run-ios', function () {
    sh.exec("cordova run ios");
});

gulp.task('buildR-ios', function () {
    sh.exec("ionic build ios && cordova run ios");
});

gulp.task('build', function () {
    // Copy the www directory
    sh.cp('-R', 'app/*', 'www');
});

gulp.task('install', function (done) {



    /*
    *
    * If not already built, build:
    * // ALSO DO THIS: chmod -R 755 saijs
    *
    * 1) Build the server
    *   a) install node dependencies (npm install)
    *   b) run the database (sh db/build.sh)
    *
    * 2) Build the app (should contain its own gulp file)
    *   a) compile scss
    *
    * 3) Build the core (should contain its own gulp file)
    *   a) bower install
    *   b) compile scss
    *   c) compile all javascript
    *   d) move everything to a build directory
    *
    *
    * */
});
