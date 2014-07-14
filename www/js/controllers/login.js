'use strict';

app.controller('LoginCtrl', function ($scope, AuthService, Base, $location) {
    function login(){
        AuthService.login($scope.user, true).then(function (res) {
            var base = new Base();
            $scope.loginErr = base.status.ok(res.status);
            $location.path('/');
        });
    }
    $scope.login = login;
});
