//document.addEventListener("deviceready", function(){angular.bootstrap(document, ['ngView']);}, true);
angular.module('saijs', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ionic'
]);

angular.module('saijs').run(function(MyIonic){
    MyIonic.init();
});