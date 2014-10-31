var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var karma = require('gulp-karma');
var replace = require('gulp-replace');

gulp.task('build ios', function () {
    sh.exec("ionic build ios");
});

gulp.task('run-ios', function () {
    sh.exec("cordova run ios");
});

gulp.task('buildR-ios', function () {
    sh.exec("ionic build ios && cordova run ios");
});

gulp.task('build', function () {
    sh.exec("rm -r dist/");
    sh.exec("mkdir dist && mkdir dist/core && mkdir dist/core/dist");
    sh.cp('-R', 'app/core/dist', 'dist/core/');
    sh.exec("gulp scripts");
    sh.exec("gulp scss");
    sh.cp('-R', 'app/img/*', 'dist/img');
    sh.cp('-R', 'app/views/*', 'dist/views');
    sh.exec("gulp index");
    sh.cp('app/cordova.js', 'dist/cordova.js');
});


gulp.task('scripts', function () {
    gulp.src([
        'app/js/utils.js',
        'app/js/app.js',
        'app/js/constants.js',
        'app/js/routes.js',
        'app/js/controllers/home.js',
        'app/js/controllers/login.js',
        'app/js/controllers/signup.js',
        'app/js/services/user.js'
    ])
        .pipe(concat('scripts.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scss', function () {
    gulp.src('app/scss/main.scss')
        .pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('index', function () {
    sh.cp('app/index.html', 'dist/index.html');
    gulp.src(['dist/index.html'])
        .pipe(replace(/<!--saijs:scripts:dev-->((\n)(.)*)+<!--!saijs:scripts:dev-->/, ''))
        .pipe(replace('saijs:scripts:build', ''))
        .pipe(replace('<!--', ''))
        .pipe(replace('-->', ''))
        .pipe(gulp.dest('dist/'));
});

