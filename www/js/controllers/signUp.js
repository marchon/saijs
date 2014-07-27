'use strict';

app.controller('SignUpCtrl', function ($scope, User, AuthService) {
    $scope.user = {};
    function createUser() {
        User.fill($scope.user);
        User.create().then(function (res) {
            if (User.status.ok(res.status)) {
                $scope.error = false;
                if (res.data.success) {
                    AuthService.loginNew(res.data.token, res.data.user);
                    return;
                }
            }

            $scope.errorMessage = data.err;
            $scope.error = true;
        });
    }
    $scope.createUser = createUser;
});
