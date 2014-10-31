/*
* This directive is used for input name attributes.
* Example Usage:
* <input type='text'  dynamic-name='someData'>
* */
angular.module('saijs').directive('dynamicName', function($compile, $parse) {
    return {
        restrict: 'A',
        terminal: true,
        priority: 100000,
        link: function(scope, elem) {
            var name = $parse(elem.attr('dynamic-name'))(scope);
            elem.removeAttr('dynamic-name');
            elem.attr('name', name);
            $compile(elem)(scope);
        }
    };
});