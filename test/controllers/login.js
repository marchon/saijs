'use strict';

describe('Unit: Login Controller', function () {
    var createController, scope, httpBackend, location, PATHS;

    beforeEach(module('myApp'));
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, $templateCache, $location) {
        httpBackend = $httpBackend;
        PATHS = $rootScope.PATHS;
        location = $location;
        //var viewHtml = $templateCache.get('views/login.html');
        //if(!viewHtml) {
        var viewHtml = $.ajax("/base/www/views/login.html", {async: false}).responseText;


        log("HTML", viewHtml);
        // $templateCache.put('views/login.html', viewHtml);
        //}

        //$templateCache.put('views/home.html', '<template></template>');
        //$templateCache.put('views/login.html', '<div>    <div class="responsive-sm">        <img src="holder.js/100%x200/sky/text:Your Logo" holder-fix>        <div class="alert alert-danger" data-ng-if="loginErr">Username and/or password is incorrect</div>        <label class="item item-input">            <span class="input-label">Email</span>            <input type="email" data-ng-model="user.username" name="user">        </label>        <label class="item item-input">            <span class="input-label">Password</span>            <input type="password" data-ng-model="user.password" name="pass">        </label>        <br/>        <button class="button button-calm" id="login_button" ng-click="login()">            Login        </button>    </div></div>');
        scope = $rootScope.$new();
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