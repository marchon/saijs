var app = angular.module('myApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ionic'
]);
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}).run(function ($rootScope, AuthService, $location, $templateCache, $http, $route, $ionicPlatform) {
    $rootScope.auth = false;

    AuthService.evaluateAuthenticated().then(function(){
        AuthService.loadLocationInterceptor();
    });

    $rootScope.logout = function(){
        AuthService.logout();
    }



    // Ionic
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    /*
     cacheRoutes($templateCache, $http, $route,
     [
     'header.html',
     'home.html',
     'login.html'
     ]);
     */
});
