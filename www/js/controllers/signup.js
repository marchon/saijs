'use strict';

app.controller('SignupCtrl', function ($scope, User) {

    $scope.signup = function () {
        // Remove confirm_password from object.
        var user = angular.copy($scope.user);
        delete user.confirm_password;

        // Save
        User.fill(user);
        User.create().then(function () {
            log("user was just created");
            // Log user in.
        });
    }
});
