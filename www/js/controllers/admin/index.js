'use strict';

app.controller('AdminCtrl', function ($scope, $injector) {
    /*
    *
    * $scope.adminActive = {
     mode: "create",
     view: "home",
     campaign: 0,
     ad: 0,
     mediaElement: 0,
     offer: 0,
     product: 0
     };

     $scope.assignActiveCrudElement = function (type, data) {
     $scope.adminActive.mode = (typeof data === "number") ? "create" : "edit";
     $scope.adminActive[type] = data;
     };

     $scope.getFilteredDs = function(owner, ds, key, value){
     if(!ds || !key || !value){
     return;
     }
     if(ds!=='Campaign'){
     return;
     }
     Campaign.getWhereQ(key, value).then(function(res){
     if(Status.ok(res.status)){
     $scope.adminActive[owner]['filtered'+ds+'s'] = res.data;
     }
     });
     };

     $scope.getById = function(array, id){
     for(var i in array){
     if(array[i]._id==id){
     return array[i];
     }
     }
     }
     // Load contents
     function load(service) {
     var Service = $injector.get(service);
     Service.all().then(function (res) {
     if (Status.ok(res.status)) {
     $scope[service.toLowerCase() + 's'] = res.data;
     }
     });
     }

     load('Ad');
     load('Product');
     load('Offer');
     load('Campaign');
     load('Shopper');
     load('User');
     load('Program');
     load('Organization');



     $scope.$watch('adminActive.view', function(){
     //load($scope.adminActive.view.charAt(0).toUpperCase() + $scope.adminActive.view.slice(1).slice(0, - 1));
     if($scope.adminActive.view=='ads'){
     load('Offer');
     }
     })*/
});
