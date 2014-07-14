'use strict';

app.service('AuthService', function AuthService(Base, $rootScope, $location, PUBLIC_ROUTES, PATHS, $q, $window, ADMIN_ROLE, DEFAULT_ROLE, ADMIN_ONLY_ROUTES) {

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
            return $.cookie(config.tokenName) !== null;
        };

        this.validate = function () {
            if (this.has()) {
                return base.request('POST', PATHS.api_host + config.ctrl + config.validateTokenEndpoint, null, $q.defer());
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
                // Evaluate admin
            }
        };
    }

    function UserHelper() {
        this.applyUserData = function (user) {
            log("here", user);
            $rootScope.auth = true;
            $rootScope.user = user;
            if(!$rootScope.$$phase){
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
            var r = base.request('POST', PATHS.api_host + config.ctrl + config.loginEndpoint, user, $q.defer());
            r.then(function (res) {
                if (base.status.ok(res.status)) {
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
                    if (base.status.ok(res.status)) {
                        if (res.data.success) {
                            UH.applyUserData(res.data.user);
                        } else {
                            TH.remove();
                            UH.destroyUserData();
                        }
                    }
                });
            } else {
                p = {then: function (cb) {
                }}
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
    }

    var TH = new TokenHelper();
    var LE = new LocationEvaluator();
    var UH = new UserHelper();

    var config = {
        loginRoute: 'login',
        home: 'home',
        tokenName: 'token',
        ctrl: 'auth/',
        loginEndpoint: 'login',
        validateTokenEndpoint: 'validatetoken'
    }

    var base = new Base();
    return new Auth();
});
