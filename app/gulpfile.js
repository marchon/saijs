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
    sh.exec("rm -r ../dist/");
    sh.exec("mkdir ../dist");
    //sh.exec("mkdir dist && mkdir dist/lib && mkdir dist/core/dist");
    sh.cp('-R', 'lib/', '../dist/lib/');
    sh.exec("gulp scripts");
    sh.exec("gulp scss");
    sh.cp('-R', 'img/*', '../dist/img');
    sh.cp('-R', 'views/*', '../dist/views');
    sh.exec("gulp index");
    sh.cp('cordova.js', '../dist/cordova.js');
});


gulp.task('scripts', function () {
    gulp.src([
        'js/utils.js',
        'js/app.js',
        'js/constants.js',
        'js/routes.js',
        'js/controllers/home.js',
        'js/controllers/login.js',
        'js/controllers/signup.js',
        'js/services/user.js'
    ])
        .pipe(concat('scripts.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('../dist/js'));
});

gulp.task('scss', function () {
    gulp.src('scss/main.scss')
        .pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('../dist/css'));
});

gulp.task('index', function () {
    sh.cp('index.html', '../dist/index.html');
    gulp.src(['../dist/index.html'])
        .pipe(replace(/<!--saijs:scripts:dev-->((\n)(.)*)+<!--!saijs:scripts:dev-->/, ''))
        .pipe(replace('saijs:scripts:build', ''))
        .pipe(replace('<!--', ''))
        .pipe(replace('-->', ''))
        .pipe(gulp.dest('../dist/'));
});

gulp.task('install', function () {
    sh.exec("echo 'brains'");
    // npm install for server/package.json
    // npm install for package.json
});

gulp.task('db-reset', function () {
    sh.exec("echo 'brains'");
    // run db
});
