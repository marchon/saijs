'use strict';

app.controller('SignUpCtrl', function ($scope, User) {
    $scope.user = {};
    function createUser(){
        User.fill($scope.user);
        User.create().then(function(res){
            if(User.status.ok(res.status)){
                $scope.error = false;
            }else{
                $scope.errorMessage = data.err;
                $scope.error = true;
            }
        });
    };
    $scope.createUser = createUser;
});
