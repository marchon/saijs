'use strict';

describe('Unit: Truncate Filter', function () {
    var filter, string;
    beforeEach(module('myApp'));
    beforeEach(inject(function ($filter) {
        filter = $filter;
        string = 'I was looking at the ducks in the park on a Wednesday.';
    }));

    it('should truncate words successfully', function(){
        expect(filter('words')).toBeDefined();
        expect(filter('words')(string, 2)).toBe('I was...');
        expect(filter('words')(string, 10)).toBe('I was looking at the ducks in the park on...');
        expect(filter('words')('', 10)).toBe('');
        expect(filter('words')(null, 10)).toBe(null);

    });

    it('should truncate characters successfully', function(){
        expect(filter('chars')).toBeDefined();
        expect(filter('chars')(string, 4, true)).toBe('I wa...');
        expect(filter('chars')(string, 4, false)).toBe('I...');
        expect(filter('chars')(string, 10, true)).toBe('I was look...');
        expect(filter('chars')(string, 10, false)).toBe('I was...');
        expect(filter('chars')('', 10)).toBe('');
        expect(filter('chars')(null, 10, false)).toBe(null);
    });


});