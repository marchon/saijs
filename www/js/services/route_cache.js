'use strict';

app.service('RouteCache', function RouteCache(Base, $templateCache, $http, $route) {

    function RouteCacheService() {
        this.start = function(){

            /*
             cacheRoutes($templateCache, $http, $route,
             [
             'header.html',
             'home.html',
             'login.html'
             ]);
             */
        };
    }

    RouteCacheService.prototype = new Base();
    return new RouteCacheService();
});