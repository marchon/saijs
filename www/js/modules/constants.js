var HOST = (location.hostname) ? location.hostname : "undefined";
var HOSTS = {
    "sais.com":{/*Local*/
        api_host:"http://localhost:1337/",
        content_host:"http://localhost:1337/image/"
    }
};

app
    .constant('APP_NAME', 'SAIS')
    .constant('PUBLIC_ROUTES', ['/login'])
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


