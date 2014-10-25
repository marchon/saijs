'use strict';

app.controller('SignupCtrl', function ($scope, User, AuthService, Status) {

    $scope.signup = function () {
        // Remove confirm_password from object.
        var user = angular.copy($scope.user);
        delete user.confirm_password;

        // Save
        User.fill(user);
        User.create().then(function (res) {
            if (Status.ok(res.status)) {
                if (res.data.success) {
                    // Log in user
                    AuthService.login(user, true).then(function (res2) {
                        if (Status.ok(res.status) && res.data.success) {
                            $location.path("/");
                        }
                    });
                }
            }
        });
    }
});
