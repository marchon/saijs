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

gulp.task('ios', function () {
    sh.exec("ionic build ios");
});

gulp.task('build', function () {
    sh.exec("rm -r dist/");
    sh.exec("mkdir dist");
    //sh.exec("mkdir dist && mkdir dist/lib && mkdir dist/core/dist");
    sh.cp('-R', 'app/lib/', 'dist/lib/');
    sh.exec("gulp scripts");
    sh.exec("gulp scss");
    sh.cp('-R', 'app/img/*', 'dist/img');
    sh.cp('-R', 'app/views/*', 'dist/views');
    sh.exec("gulp index");
    sh.cp('app/cordova.js', 'dist/cordova.js');
    sh.exec("gulp ios");
});

gulp.task('run', function () {
    sh.exec("ionic run ios");
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

gulp.task('test', function () {
    sh.exec("karma start karma.conf.js");
});

gulp.task('db-reset', function () {
    sh.exec("echo 'brains'");
    // run db
});

gulp.task('scss', function () {
    gulp.src('app/scss/**.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css/'));
});


gulp.task('watch', function() {
    gulp.watch('app/scss/**.scss', function() {
        gulp.run('scss');
    });
});

gulp.task('default', ['watch']);