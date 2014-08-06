'use strict';

app.service('MyIonic', function MyIonic($ionicPlatform) {

    function MyIonicService() {
        this.init = function(){
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        }
    }
    return new MyIonicService();
});