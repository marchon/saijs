var app = angular.module('myApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ionic'
]);
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}).run(function ($rootScope, AuthService, MyIonic) {
    $rootScope.auth = false;

    AuthService.evaluateAuthenticated().then(function(){
        AuthService.loadLocationInterceptor();
    });

    $rootScope.logout = function(){
        AuthService.logout();
    };

    MyIonic.start();
});
