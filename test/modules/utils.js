'use strict';

describe('Unit: Utils', function () {
    beforeEach(module('myApp'));
    beforeEach(inject(function () {

    }));

    it('should have a log() function', function(){
        expect(typeof log).toBe('function');
    });

    it('should return a UUID', function(){
        expect(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(generateUUID())).toBe(true);
    });

    it('should evaluate a status', function(){
        expect(typeof Status.ok).toBe('function');
        expect(Status.ok(404)).toBe(false);
        expect(Status.ok(200)).toBe(true);
    });
});