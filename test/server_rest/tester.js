/* SimpleRestTest | GPL | CarlosPliego */
var simpleRestTests = [];
angular.module('myApp', []).controller('SimpleRestTestCtrl', function ($scope, $http, $q) {
    $scope.host = simpleRestTestHost;
    $scope.tests = simpleRestTests;
    $scope.errorCnt = 0;
    
    function startTests(){
        /* Test everything */
        for(var index in $scope.tests){
            var test = $scope.tests[index];
            makeRequest(test, $q.defer(), index).then(function(data){
                var respData = data[0];
                var respCode = data[1];
                var requestHeaders = data[2];
                // Test response code
                if(respCode!=$scope.tests[requestHeaders.index].expRespCode){
                    $scope.tests[requestHeaders.index].errorMessages.push(
                        "Expected Response: "+$scope.tests[requestHeaders.index].expRespCode+
                            " Was not met"
                    );
                }
                /* Test data */
                if($scope.tests[requestHeaders.index].expRespData){
                    if(JSON.stringify(respData)!=JSON.stringify($scope.tests[requestHeaders.index].expRespData)){
                        $scope.tests[requestHeaders.index].errorMessages.push(
                            "Expected Data: "+$scope.tests[requestHeaders.index].expRespData+
                                " Was not met"
                        );
                    }
                }
                /* Gather results */
                if($scope.tests[requestHeaders.index].errorMessages.length>0){
                    $scope.tests[requestHeaders.index].hasError = true;
                    $scope.errorCnt++;
                }else{
                    $scope.tests[requestHeaders.index].hasError = false;
                }
                /* Set response code */
                $scope.tests[requestHeaders.index].responseCode = respCode;

            });
        }
    }

    function makeRequest(test, $q, index){
        $http({
            method: test.method,
            url: simpleRestTestHost+test.endpoint+'/'+test.function+"/",
            data: test.data,
            header: "{Content-Type: application/json}",
            index: index
        }).error(function (data, status, headers, config) {
                $q.resolve([data, status, config]);
            }).success(function (data, status, headers, config) {
                $q.resolve([data, status, config]);
            });
        return $q.promise;
    }
    startTests();
});

function SimpleRestTest(_endpoint, _function, _method, _data, _expRespCode, _expRespData) {
    this.endpoint = _endpoint;
    this.function = _function;
    this.method = _method;
    this.data = _data;
    this.expRespCode = _expRespCode;
    this.expRespData = _expRespData
    this.responseCode;
    this.errorMessages = [];
}