var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
    sass: ['./www/scss/**/*.scss']
};

var clientUnitTestFiles = [
    'test/client_unit'
];

gulp.task('test', function () {
    // Client Tests
    //sh.exec("karma start test/client_unit/karma.conf.js --singleRun=true");
    sh.exec("jasmine-node test/server_rest/");
});


/*
gulp.task('test-run', function () {
    sh.exec("karma start test/client_unit/karma.conf.js --singleRun=false");
});
*/

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./www/scss/main.scss')
        .pipe(sass())
        //.pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('api-run', function () {
    sh.exec("cd server/ && sails lift");
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('build', function () {
    sh.cp('-R', 'www/*', 'dist');
});

gulp.task('install', function () {
    sh.exec("npm install");
    sh.exec("cd server/ && npm install");
});
