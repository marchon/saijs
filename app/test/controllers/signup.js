'use strict';

describe('Unit: Signup Controller', function () {
    var Controller;

    beforeEach(module('myApp'));
    beforeEach(inject(function ($controller) {
        Controller = function() {
            return $controller('SignupCtrl', {
                '$scope': scope
            });
        };
    }));
});