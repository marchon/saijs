'use strict';

app.controller('LoginCtrl', function ($scope, AuthService, $location, Status) {

    $scope.remember = true;
    $scope.loginErr = false;

    function login() {
        AuthService.login($scope.user, $scope.remember).then(function (res) {
            if (Status.ok(res.status)) {
                if (!res.data.success) {
                    $scope.loginErr = true;
                } else {
                    $scope.loginErr = false;
                    $location.path("/");
                }
            }
        });
    }

    $scope.login = login;
});
