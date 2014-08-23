'use strict';

var app = angular.module('myApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ionic'
]);
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}).run(function ($rootScope, AuthService,  PATHS,  $location, $templateCache, $http, $route, MyIonic) {
    $rootScope.PATHS = PATHS;
    $rootScope.auth = false;

    AuthService.evaluateAuthenticated().then(function(){
        AuthService.loadLocationInterceptor();
    });

    $rootScope.logout = function(){
        AuthService.logout();
    };

    MyIonic.init();
});
