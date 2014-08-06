'use strict';

var host = (location.hostname) ? location.hostname : "undefined";
var hosts = {
    "localhost":{/*General*/
        api_host:"http://localhost:1337/",
        content_host:"http://localhost:1337/image/"
    },
    "undefined":{/*IOS*/
        api_host:"http://localhost:1337/",
        content_host:"http://localhost:1337/image/"
    }
};

app
    .constant('PUBLIC_ROUTES', ['/login'])
    .constant('REQUEST_CACHE', false)
    .constant('PATHS', {
        host: host,
        api_host: hosts[host].api_host,
        content_host: hosts[host].content_host
    });


