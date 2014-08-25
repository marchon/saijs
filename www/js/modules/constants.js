'use strict';

var host = (location.hostname) ? location.hostname : "undefined";
var hosts = {
    "localhost":{/*General*/
        api_host:"http://localhost:8081/"
    },
    "undefined":{/*IOS*/
        api_host:"http://localhost:8081/"
    }
};
var env = "development";
app
    .constant('PUBLIC_ROUTES', ['/login'])
    .constant('REQUEST_CACHE', false)
    .constant('PATHS', {
        host: host,
        api_host: hosts[host].api_host
    });


