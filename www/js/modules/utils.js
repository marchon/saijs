'use strict';

// Simple log function to keep the example simple
function log() {
    if (typeof console !== 'undefined') {
        console.log.apply(console, arguments);
    }
}

// Route Caching: put in angular module or something
function cacheRoutes($templateCache, $http, $route, partials) {
    var i, path;
    for (i in $route.routes) {
        if ($route.routes[i].templateUrl) {// If a defined route.
            if (!$templateCache.get($route.routes[i].templateUrl)) {// If not cached
                $http.get($route.routes[i].templateUrl, {cache: $templateCache});
            }
        }
    }
    /*
     for (var i in partials) {
     path = "views/partials/" + partials[i];
     if (partials[i]) {
     if (!$templateCache.get(path)) {// If not cached
     $http.get(path, {cache: $templateCache});
     }
     }
     }
     */
}

// PUT IN MODULE
function Status() {
    this.ok = function (status) {
        return (status === 200) ? true : false;
    };
}

var Status = new Status();