'use strict';

app.service('AuthService', function AuthService(Base, $rootScope, $location, PUBLIC_ROUTES, PATHS, $q, $window) {

    function TokenHelper() {
        this.remove = function () {
            delete $window.sessionStorage[config.tokenName];
            $.cookie(config.tokenName, null);
        };

        this.create = function (token, remember) {
            if (remember) {
                $.cookie(config.tokenName, token, {expires: 365});
            }
            $window.sessionStorage[config.tokenName] = token;
        };

        this.has = function () {
            return $.cookie(config.tokenName) != null;
        };

        this.validate = function () {
            if (this.has()) {
                return base.request('POST', null, PATHS.api_host + config.ctrl + config.validateTokenEndpoint, null, $q.defer());
            }
        };
    }

    function LocationEvaluator() {
        this.evaluate = function (url) {
            if (!$rootScope.auth) {
                if (!(PUBLIC_ROUTES.indexOf(url) !== -1)) {
                    $location.path(config.loginRoute);
                }
            } else {
                // Re-route if already logged in
                if (config.pathsToHideIfAuthenticated.indexOf("/" + url)) {
                    $location.path("/");
                }
            }
        };
    }

    function UserHelper() {
        this.applyUserData = function (user) {
            $rootScope.auth = true;
            $rootScope.user = user;
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
        };
        this.destroyUserData = function () {
            $rootScope.auth = false;
            delete $rootScope.user;
        };
    }

    function Auth() {
        this.login = function (user, remember) {
            var r = base.request('POST', null, PATHS.api_host + config.ctrl + config.loginRoute, user, $q.defer());
            r.then(function (res) {
                if (Status.ok(res.status)) {
                    TH.create(res.data.token, remember);
                    UH.applyUserData(res.data);
                } else {
                    TH.remove();
                    UH.destroyUserData();
                }
            });
            return r;
        };

        this.logout = function () {
            TH.remove();
            UH.destroyUserData();
            $location.path(config.home);
        };

        this.evaluateAuthenticated = function () {
            var p;
            if (TH.has()) {
                p = TH.validate().then(function (res) {
                    if (Status.ok(res.status)) {
                        if (res.data.success) {
                            UH.applyUserData(res.data.user);
                        } else {
                            TH.remove();
                            UH.destroyUserData();
                        }
                    }
                });
            } else {
                p = {
                    then: function (cb) {
                        cb()
                    }
                }
            }
            return p;
        };

        this.loadLocationInterceptor = function () {
            // This function loads a watcher and evaluates the current route against authentication.
            var w = $rootScope.$watch('auth', function () {
                if ($rootScope.hasOwnProperty('auth')) {
                    // Evaluate future location changes (asynchronous)
                    $rootScope.$on('$locationChangeStart', function (event, next, current) {
                        return LE.evaluate($location.url());
                    });

                    LE.evaluate($location.url());
                    w();
                }
            });
        };

        this.loginNew = function (token, user) {
            // Implement this here
            log("Inside auth service | TOKEN: " + token, " USER: " + user);
        }

    }

    var TH = new TokenHelper();
    var LE = new LocationEvaluator();
    var UH = new UserHelper();

    var config = {
        loginRoute: 'login',
        signupRoute: 'signup',
        pathsToHideIfAuthenticated: [this.loginRoute, this.signupRoute],
        home: 'home',
        tokenName: 'token',
        ctrl: 'auth/',
        loginEndpoint: 'login',
        validateTokenEndpoint: 'validatetoken'
    };

    var base = new Base();
    return new Auth();
});
