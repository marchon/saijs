'use strict';

describe('Unit: Login Controller', function () {
    var createController, scope, httpBackend, location, PATHS, view;
    beforeEach(module('myApp'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, $templateCache, $location, $compile) {
        httpBackend = $httpBackend;
        PATHS = $rootScope.PATHS;
        location = $location;
        scope = $rootScope.$new();

        // Templates
        $templateCache.put('views/home.html', $.ajax("app/views/home.html", {async: false}).responseText);
        $templateCache.put('views/login.html', $.ajax("app/views/login.html", {async: false}).responseText);
        view = $compile(angular.element($templateCache.get('views/login.html')))(scope);

        // Controller
        createController = function () {
            return $controller('LoginCtrl', {
                '$scope': scope
            });
        };
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('Should login successfully', function () {
        createController();

        // Setup initial invalid token status
        httpBackend.expect('POST', PATHS.api_host + 'auth/validatetoken')
            .respond({
                "success": false
            });

        httpBackend.expect('POST', PATHS.api_host + 'auth/login')
            .respond({
                "success": true
            });

        scope.$apply(function () {
            scope.login();
        });

        httpBackend.flush();
        expect(scope.loginErr).toBe(false);
        expect(location.$$url).toBe('/');

    });

    it('Should login un-successfully', function () {
        createController();
        // Setup initial invalid token status
        httpBackend.expect('POST', PATHS.api_host + 'auth/validatetoken')
            .respond({
                "success": false
            });

        httpBackend.expect('POST', PATHS.api_host + 'auth/login')
            .respond({
                "success": false
            });

        scope.$apply(function () {
            scope.login();
        });

        httpBackend.flush();
        expect(scope.loginErr).toBe(true);
        expect(location.$$url).toBe('/login');
    });
});