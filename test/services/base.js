'use strict';

describe('Unit: Base Service', function () {
    var PATHS, Service, $q, temp, obj;

    beforeEach(module('myApp'));
    beforeEach(inject(function (_User_, _PATHS_, _$q_) {
        Service = _User_;
        PATHS = _PATHS_;
        $q = _$q_;
        temp = Service.ctrl;
        obj = {title:"Charlie Brown"};
    }));

    it('Should get all successfully', function () {
        // All No Throw
        expect(function () {
            Service.all();
        }).not.toThrow();

        // Extended service ctrl
        testExtendedServiceCtrl('all', null);

        // All Promise
        expect(Service.all().then()).toBeDefined();
    });

    it('Should fill successfully', function () {
        // Fill Not Defined
        expect(function () {
            Service.fill();
        }).toThrowError(Service.errors['fill-defined']);

        // Fill Not Object
        expect(function () {
            Service.fill(1);
        }).toThrowError(Service.errors['fill-type-object']);

        // Fill No Throw
        expect(function () {
            Service.fill(obj);
        }).not.toThrow();

        // Fill Promise
        expect(Service.data.title).toBe(obj.title);

        // Clear Data
        Service.data = null;
    });

    it('Should get successfully', function(){

        // Id must be defined
        expect(function () {
            Service.get();
        }).toThrowError(Service.errors['id-defined']);

        // Extended service ctrl
        testExtendedServiceCtrl('get', 1);

        // Get No Throw
        expect(function () {
            Service.get(1);
        }).not.toThrow();

        // Get Promise
        expect(Service.get(1).then()).toBeDefined();

    });

    it('Should create successfully', function(){
        // Test Fill Error
        testCallFillFirstError('create', null);

        // Fill Object
        Service.fill(obj);
        expect(Service.data).toBe(obj);

        // Extended service ctrl
        testExtendedServiceCtrl('create', null);

        // Create
        expect(function () {
            Service.create();
        }).not.toThrow();

        // Create Promise
        expect(Service.create().then()).toBeDefined();

        // Clear Data
        Service.data = null;

    });

    it('Should update successfully', function(){
        // Test Fill Error
        testCallFillFirstError('update', null);

        // Fill Object
        Service.fill(obj);
        expect(Service.data).toBe(obj);

        // Extended service ctrl
        testExtendedServiceCtrl('update', null);

        // Update Id Must Be Defined
        expect(function () {
            Service.update();
        }).toThrowError(Service.errors['id-defined']);

        // Update
        expect(function () {
            Service.update(1);
        }).not.toThrow();

        // Update Promise
        expect(Service.update(1).then()).toBeDefined();

        // Clear Data
        Service.data = null;

    });

    it('Should delete successfully', function(){

        // Extended service ctrl
        testExtendedServiceCtrl('delete', 1);

        // Delete Id Must Be Defined
        expect(function () {
            Service.delete();
        }).toThrowError(Service.errors['id-defined']);

        // Delete
        expect(function () {
            Service.delete(1);
        }).not.toThrow();

        // Delete Promise
        expect(Service.delete(1).then()).toBeDefined();

    });

    it('Should request successfully', function(){
        // Method Error
        expect(function () {
            Service.request(null, null, PATHS.api_host + '/user', null, $q.defer());
        }).toThrowError(Service.errors['method-defined']);
        expect(function () {
            Service.request('asdf', null, PATHS.api_host + '/user', null, $q.defer());
        }).toThrowError(Service.errors['method-defined']);

        // Url Error
        expect(function () {
            Service.request('GET', null, '', null, $q.defer());
        }).toThrowError(Service.errors['url-defined']);

        // Q Error
        expect(function () {
            Service.request('POST', null, PATHS.api_host + '/user', {}, null);
        }).toThrowError(Service.errors['q-defined']);
        expect(function () {
            Service.request('POST', null, PATHS.api_host + '/user', {}, {});
        }).toThrowError(Service.errors['q-defined']);

        // GET
        expect(function () {
            Service.request('GET', null, PATHS.api_host + '/user', null, $q.defer());
        }).not.toThrow();
        expect(Service.request('GET', null, PATHS.api_host + '/user', null, $q.defer()).then()).toBeDefined();

        // POST
        Service.fill(obj);
        expect(function () {
            Service.request('POST', null, PATHS.api_host + Service.ctrl, Service.data, $q.defer());
        }).not.toThrow();
        expect(Service.request('POST', null, PATHS.api_host + Service.ctrl, Service.data, $q.defer()).then()).toBeDefined();

        // PUT
        Service.fill(obj);
        expect(function () {
            Service.request('PUT', null, PATHS.api_host + Service.ctrl + 1, Service.data, $q.defer());
        }).not.toThrow();
        expect(Service.request('PUT', null, PATHS.api_host + Service.ctrl + 1, Service.data, $q.defer()).then()).toBeDefined();

        // DELETE
        expect(function () {
            Service.request('DELETE', null, PATHS.api_host + Service.ctrl + 1, null, $q.defer());
        }).not.toThrow();
        expect(Service.request('DELETE', null, PATHS.api_host + Service.ctrl + 1, null, $q.defer()).then()).toBeDefined();

    });

    function testExtendedServiceCtrl(method, params){
        Service.ctrl = null;
        expect(function () {
            Service[method](params);
        }).toThrowError(Service.errors['ctrl-defined']);
        Service.ctrl = temp;
    }

    function testCallFillFirstError(method, params){
        expect(function () {
            Service[method](params);
        }).toThrowError(Service.errors['fill-first']);
    }

});