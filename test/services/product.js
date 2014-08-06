'use strict';

describe('Unit: Campaign Service', function () {
    var PATHS, Service, $q, temp;

    beforeEach(module('myApp'));
    beforeEach(inject(function (_Product_, _PATHS_, _$q_) {
        Service = _Product_;
        PATHS = _PATHS_;
        $q = _$q_;
    }));

    it('Should have defined class attributes', function () {
        expect(PATHS.api_host).toBeDefined();
        expect(Service.ctrl).toBeDefined();
    });

    // Should return a valid callback
    it('Should return a valid callback', function () {
        expect(Service.all().then()).toBeDefined();
        expect(Service.get(1).then()).toBeDefined();
        expect(Service.get(1, true).then()).toBeDefined();
        expect(Service.getWhere('a', 'b').then()).toBeDefined();
        expect(Service.fill({a: 'b'})).toBeUndefined();
        expect(Service.create().then()).toBeDefined();
        expect(Service.update().then()).toBeDefined();
        expect(Service.delete(1).then()).toBeDefined();
        expect(Service.request('GET', PATHS.api_host + Service.ctrl, null, $q.defer()).then()).toBeDefined();
        expect(Service.request('GET', PATHS.api_host + Service.ctrl, null, $q.defer()).then()).toBeDefined();
        expect(Service.request('GET', PATHS.api_host + Service.ctrl, null, $q.defer()).then()).toBeDefined();
        expect(Service.request('GET', PATHS.api_host + Service.ctrl + 1 + "", null, $q.defer()).then()).toBeDefined();
        expect(Service.request('GET', PATHS.api_host + Service.ctrl + 1 + "?deep=true", null, $q.defer()).then()).toBeDefined();
        expect(Service.request('GET', PATHS.api_host + Service.ctrl + 'where?' + 'a' + '=' + 'b', null, $q.defer()).then()).toBeDefined();
        expect(Service.request('POST', PATHS.api_host + Service.ctrl, Service.data, $q.defer()).then()).toBeDefined();
        expect(Service.request('PUT', PATHS.api_host + Service.ctrl + 1, Service.data, $q.defer()).then()).toBeDefined();
        expect(Service.request('DELETE', PATHS.api_host + Service.ctrl + 1, null, $q.defer()).then()).toBeDefined();
    });

    // Should throw the correct errors
    it('Should throw the correct errors', function () {
        temp = Service.ctrl;

        // All
        Service.ctrl = null;
        expect(function () {
            Service.all()
        }).toThrowError("If your class extends the base service is must have this.ctrl defined.");
        Service.ctrl = temp;

        // Get
        expect(function () {
            Service.get()
        }).toThrowError("Id must be defined.");
        Service.ctrl = null;
        expect(function () {
            Service.get(1)
        }).toThrowError("If your class extends the base service is must have this.ctrl defined.");
        Service.ctrl = temp;
        expect(function () {
            Service.get(1)
        }).not.toThrow();

        // Get Where
        expect(function () {
            Service.getWhere()
        }).toThrowError("Key and Value must be defined");
        expect(function () {
            Service.getWhere('a')
        }).toThrowError("Key and Value must be defined");
        Service.ctrl = null;
        expect(function () {
            Service.getWhere('a', 'b')
        }).toThrowError("If your class extends the base service is must have this.ctrl defined.");
        Service.ctrl = temp;
        expect(function () {
            Service.getWhere('a', 'b')
        }).not.toThrow();
        expect(function () {
            Service.getWhere('a', 'b')
        }).not.toThrow();

        // Fill
        expect(function () {
            Service.fill()
        }).toThrowError("_fill must be defined");
        expect(function () {
            Service.fill('a')
        }).toThrowError("_fill must be of type 'object'");
        expect(function () {
            Service.fill(1)
        }).toThrowError("_fill must be of type 'object'");
        expect(function () {
            Service.fill({a: 'b'})
        }).not.toThrow();
        expect(Service.data).toEqual({a: 'b'});
        expect(Service.fill({a: 'b'})).toBeUndefined();

        // Create
        Service.data = null;
        expect(function () {
            Service.create()
        }).toThrowError("You must call fill on this object before calling create.");
        Service.data = {a: 'b'};
        expect(function () {
            Service.create()
        }).not.toThrow();
        Service.ctrl = null;
        expect(function () {
            Service.create()
        }).toThrowError("If your class extends the base service is must have this.ctrl defined.");
        Service.ctrl = temp;

        // Update
        Service.data = null;
        expect(function () {
            Service.update()
        }).toThrowError("You must call fill on this object before calling update.");
        Service.data = {a: 'b'};
        expect(function () {
            Service.update()
        }).not.toThrow();
        Service.ctrl = null;
        expect(function () {
            Service.update()
        }).toThrowError("If your class extends the base service is must have this.ctrl defined.");

        // Delete
        expect(function () {
            Service.delete()
        }).toThrowError("Id must be defined.");
        expect(function () {
            Service.delete(1)
        }).not.toThrow();
        Service.ctrl = temp;

    });
});