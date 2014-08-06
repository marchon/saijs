'use strict';

app.service('Base', function Base($rootScope, $http, $q, PATHS, REQUEST_CACHE) {
    function BaseService() {

        this.all = function () {
            if (!this.ctrl) {
                throw new Error("If your class extends the base service is must have this.ctrl defined.");
            }
            return this.request('GET', null, PATHS.api_host + this.ctrl, null, $q.defer());
        };

        this.get = function (id, deep) {
            if (!id) {
                throw new Error("Id must be defined.");
            }
            if (!this.ctrl) {
                throw new Error("If your class extends the base service is must have this.ctrl defined.");
            }
            var deepQ = (deep) ? "?deep=true" : "";
            return this.request('GET', null, PATHS.api_host + this.ctrl + id + deepQ, null, $q.defer());
        };

        this.fill = function (_fill) {
            if (!_fill) {
                throw new Error("_fill must be defined");
            }
            if (typeof _fill !== "object") {
                throw new Error("_fill must be of type 'object'");
            }
            this.data = _fill;
        };

        this.create = function () {
            if (!this.data) {
                throw new Error("You must call fill on this object before calling create.");
            }
            if (!this.ctrl) {
                throw new Error("If your class extends the base service is must have this.ctrl defined.");
            }

            return this.request('POST', null, PATHS.api_host + this.ctrl, this.data, $q.defer());
        };

        this.update = function (id) {
            if (!this.data) {
                throw new Error("You must call fill on this object before calling update.");
            }
            if (!this.ctrl) {
                throw new Error("If your class extends the base service is must have this.ctrl defined.");
            }
            return this.request('PUT', null, PATHS.api_host + this.ctrl + id, this.data, $q.defer());
        };

        this.delete = function (id) {
            if (!id) {
                throw new Error("Id must be defined.");
            }

            return this.request('DELETE', null, PATHS.api_host + this.ctrl + id, null, $q.defer());
        };

        this.request = function (method, header, url, data, q) {
            $http({
                method: method,
                url: url,
                data: data,
                header: (header) ? header : "{Content-Type: application/json}",
                cache: REQUEST_CACHE
            }).success(function (data, status, headers) {
                var results = {};
                results.data = data;
                results.headers = headers;
                results.status = status;
                q.resolve(results);
            }).error(function (data, status, headers) {
                var results = {};
                results.data = data;
                results.headers = headers;
                results.status = status;
                q.resolve(results);
            });
            return q.promise;
        };
    }

    return BaseService;
});