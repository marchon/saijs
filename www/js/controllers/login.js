'use strict';

app.controller('LoginCtrl', function ($scope, AuthService, Base, $location) {
    function login(){
        AuthService.login($scope.user, true).then(function (res) {
            if(Status.ok(res.status) && res.data.success){
                $location.path('/');
            }
        });
    }
    $scope.login = login;
});
