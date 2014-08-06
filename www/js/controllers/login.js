'use strict';

app.controller('LoginCtrl', function ($scope, AuthService, $location) {
        // Hard code remember me
        $scope.remember = true;
        function login() {
            AuthService.login($scope.user, $scope.remember, $scope.department).then(function (res) {
                if(Status.ok(res.status)){
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
        $scope.remember = true;
    });
