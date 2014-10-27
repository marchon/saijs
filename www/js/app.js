'use strict';

var app = angular.module('myApp', ['saijs']);
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}).run(function ($rootScope, AuthService,  PATHS) {
    $rootScope.PATHS = PATHS;
    $rootScope.auth = false;

    AuthService.evaluateAuthenticated().then(function(){
        AuthService.loadLocationInterceptor();
    });

    $rootScope.logout = function(){
        AuthService.logout();
    };
});
