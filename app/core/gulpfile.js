var gulp = require('gulp');
var util = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var fs = require('fs');

gulp.task('install', function () {
    fs.exists('lib/', function (exists) {
        if (exists) {
            sh.exec("bower update");
        } else {
            sh.exec("bower install");
        }
    });
    sh.exec("gulp build");
});

gulp.task('build', function () {
    sh.exec("gulp scripts");
    sh.exec("gulp scss");
    sh.exec("gulp views");
});

gulp.task('scripts', function () {
    gulp.src([
        'lib/ionic/js/ionic.bundle.js',
        'lib/jquery/dist/jquery.js',
        'lib/angular-resource/angular-resource.js',
        'lib/angular-cookies/angular-cookies.js',
        'lib/angular-sanitize/angular-sanitize.js',
        'lib/angular-route/angular-route.js',
        'lib/jquery-cookie/jquery.cookie.js',
        'lib/holderjs/holder.js',
        'js/app.js',
        'js/services/status.js',
        'js/factories/authInterceptor.js',
        'js/directives/holderfix.js',
        'js/directives/sai_field.js',
        'js/directives/dynamic_name.js',
        'js/filters/truncate.js',
        'js/services/my_ionic.js',
        'js/services/auth.js',
        'js/services/base.js'
    ])
        .pipe(concat('sai.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


gulp.task('scss', function () {
    gulp.src('scss/ionic.app.scss')
        .pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('views', function () {
    sh.exec("cp -r views/ dist/views");
});

