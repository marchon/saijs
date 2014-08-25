'use strict';

describe('Unit: Constants', function () {
    var PUBLIC_ROUTES, REQUEST_CACHE, PATHS;
    beforeEach(module('myApp'));
    beforeEach(inject(function ($injector) {
        PUBLIC_ROUTES = $injector.get("PUBLIC_ROUTES");
        REQUEST_CACHE = $injector.get("REQUEST_CACHE");
        PATHS = $injector.get("PATHS");

    }));

    it('should have globals', function () {
        expect(host).toBeDefined();
        expect(hosts).toBeDefined();
        expect(hosts[host]).toBeDefined();
        expect(hosts['localhost']).toBeDefined();
        expect(hosts['undefined']).toBeDefined();
        expect(hosts['localhost'].api_host).toBe('http://localhost:8081/');
        expect(hosts['undefined'].api_host).toBe('http://localhost:8081/');
        expect(env).toBeDefined();
    });

    it('should have constants', function () {
        expect(PUBLIC_ROUTES).toBeDefined();
        expect(PUBLIC_ROUTES).toContain('/login');

        expect(REQUEST_CACHE).toBeDefined();
        expect(REQUEST_CACHE).toBeFalsy();

        expect(PATHS).toBeDefined();
        expect(PATHS.host).toBeDefined();
        expect(PATHS.host).toBe(host);
        expect(PATHS.api_host).toBe(hosts[host].api_host);
    });

});