'use strict';

app.service('MyIonic', function MyIonic(Base, $ionicPlatform) {

    function MyIonicService() {
        this.start = function(){
            // Ionic
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        };
    }

    MyIonicService.prototype = new Base();
    return new MyIonicService();
});