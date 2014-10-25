// Karma configuration
// Generated on Sat Jul 05 2014 18:09:50 GMT-0600 (MDT)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'www/lib/ionic/js/ionic.bundle.js', watched: false},
            {pattern: 'www/lib/jquery/dist/jquery.js', watched: false},
            {pattern: 'www/lib/angular-mocks/angular-mocks.js', watched: false},
            {pattern: 'www/lib/angular-resource/angular-resource.js', watched: false},
            {pattern: 'www/lib/angular-cookies/angular-cookies.js', watched: false},
            {pattern: 'www/lib/angular-sanitize/angular-sanitize.js', watched: false},
            {pattern: 'www/lib/angular-route/angular-route.js', watched: false},
            {pattern: 'www/lib/jquery-cookie/jquery.cookie.js', watched: false},
            {pattern: 'www/lib/holderjs/holder.js', watched: false},
            {pattern: 'www/system/js/**/**.js', watched: true},
            'www/js/**/*.js',
            'www/test/**/**/*.js',
            'www/views/*.html'
        ],


        // list of files to exclude
        exclude: [

        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {

        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
