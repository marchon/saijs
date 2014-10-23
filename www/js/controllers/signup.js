'use strict';

app.controller('SignupCtrl', function ($scope) {

    $scope.signup = function(){
        log("Signing up", $scope.username);
    }
});
