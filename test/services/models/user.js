'use strict';

describe('Unit: User Service', function () {
    var PATHS, Service, $q, temp;

    beforeEach(module('myApp'));
    beforeEach(inject(function (_User_, _PATHS_, _$q_) {
        Service = _User_;
        PATHS = _PATHS_;
        $q = _$q_;
    }));

    it('Should have defined class attributes', function () {
        expect(PATHS.api_host).toBeDefined();
        expect(Service.ctrl).toBeDefined();
    });

    it('Should extend base', function () {
        expect(Service.constructor.name).toBeDefined();
        expect(Service.constructor.name).toBe('BaseService');
    });

});