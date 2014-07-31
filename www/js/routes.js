app.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/f', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/signup', {
            templateUrl: 'views/sign_up.html',
            controller: 'SignUpCtrl'
        })
        .when('/admin', {
            templateUrl: 'views/admin/index.html',
            controller: 'AdminCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});