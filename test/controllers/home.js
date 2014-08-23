'use strict';

describe('Unit: Home Controller', function () {
    var Controller;

    beforeEach(module('myApp'));
    beforeEach(inject(function ($controller) {
        Controller = function() {
            return $controller('HomeCtrl', {
                '$scope': scope
            });
        };
    }));
});