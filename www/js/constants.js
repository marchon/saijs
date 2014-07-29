var HOST = (location.hostname) ? location.hostname : "undefined";
// Check for testing port
var HOSTS = {
    "saijs.local":{/*Local*/
        api_host:"http://localhost:1337/",
        content_host:"http://localhost:1337/image/"
    },
    "localhost":{/*Local*/
        api_host:"http://localhost:1337/",
        content_host:"http://localhost:1337/image/"
    }
};

app
    .constant('PUBLIC_ROUTES', ['/login', '/signup'])
    .constant('ADMIN_ONLY_ROUTES', ['/admin'])
    .constant('DEFAULT_ROLE', 'default')
    .constant('ADMIN_ROLE', 'admin')
    .constant('PATHS', {
        host: HOST,
        api_host: HOSTS[HOST].api_host,
        content_host: HOSTS[HOST].content_host
    })
    // The time the shopper is allowed to be inactive and still have a session in seconds
    .constant('INACTIVE_TIMEOUT', 10);


