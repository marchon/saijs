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
};

var clientUnitTestFiles = [
    'test/client_unit'
];

gulp.task('test', function () {
    // Be sure to return the stream
    var tests = {};
    tests.client_unit = gulp.src(clientUnitTestFiles)
        .pipe(karma({
            configFile: 'test/client_unit/karma.conf.js',
            action: 'run'
        }))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });

    return tests;
});

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/css/'))
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


gulp.task('build', function () {
    // Copy the www directory
    sh.cp('-R', 'www/*', 'dist');
});

gulp.task('install', function () {
    bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});
