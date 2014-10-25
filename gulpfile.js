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
    /* System SCSS */
    gulp.src('./www/system/scss/ionic.app.scss')
        .pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/system/css/'))
        .on('end', done);
});

gulp.task('sass', function (done) {

    /* Application SCSS */
    gulp.src('./www/scss/*')
        .pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);

});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

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
    sh.cp('-R', 'www/*', 'dist');
});

gulp.task('install', function () {
    // do this too : sass-system
    bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});
