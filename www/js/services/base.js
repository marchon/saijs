'use strict';

app.service('Base', function Base($rootScope, $http, $q, PATHS) {
    function BaseService() {

        this.status = {
            ok: function (status) {
                return (status == 200);
            }
        };

        this.all = function () {
            if (!this.ctrl) {
                throw new Error("If your class extends the base service is must have this.ctrl defined.");
            }
            return this.request('GET', PATHS.api_host + this.ctrl, null, $q.defer());
        };

        this.get = function (id, deep) {
            if (!id) {
                throw new Error("Id must be defined.");
            }
            if (!this.ctrl) {
                throw new Error("If your class extends the base service is must have this.ctrl defined.");
            }
            var deepQ = (deep) ? "?deep=true" : "";
            return this.request('GET', PATHS.api_host + this.ctrl + id + deepQ, null, $q.defer());
        };

        this.getWhere = function (key, value) {
            if (!value || !key) {
                throw new Error("Key and Value must be defined");
            }
            if (!this.ctrl) {
                throw new Error("If your class extends the base service is must have this.ctrl defined.");
            }
            return this.request('GET', PATHS.api_host + this.ctrl + 'where?' + key + '=' + value, null, $q.defer());
        }

        this.fill = function (_fill) {
            if (!_fill) {
                throw new Error("_fill must be defined");
            }
            if (typeof _fill !== "object") {
                throw new Error("_fill must be of type 'object'");
            }
            this.data = _fill;
        }

        this.create = function () {
            if (!this.data) {
                throw new Error("You must call fill on this object before calling create.");
            }
            if (!this.ctrl) {
                throw new Error("If your class extends the base service is must have this.ctrl defined.");
            }

            return this.request('POST', PATHS.api_host + this.ctrl, this.data, $q.defer());
        }

        this.update = function (id) {
            if (!this.data) {
                throw new Error("You must call fill on this object before calling update.");
            }
            if (!this.ctrl) {
                throw new Error("If your class extends the base service is must have this.ctrl defined.");
            }
            return this.request('PUT', PATHS.api_host + this.ctrl + id, this.data, $q.defer());
        }

        this.delete = function (id) {
            if (!id) {
                throw new Error("Id must be defined.");
            }

            return this.request('DELETE', PATHS.api_host + this.ctrl + id, null, $q.defer());
        }

        this.request = function (method, url, data, q) {
            $http({
                method: method,
                url: url,
                data: data,
                header: "{Content-Type: application/json}",
                cache: false// coupons wont work if you change this
            }).success(function (data, status, headers) {
                var results = [];
                results.data = data;
                results.headers = headers;
                results.status = status;
                q.resolve(results);
            })
                .error(function (data, status, headers) {
                    var results = [];
                    results.data = data;
                    results.headers = headers;
                    results.status = status;
                    q.resolve(results);
                })
            return q.promise;
        }
    }

    return BaseService;
});