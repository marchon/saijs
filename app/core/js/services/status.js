'use strict';

angular.module('saijs').service('Status', function Status() {

    function StatusService() {
        this.ok = function (status) {
            return (status === 200) ? true : false;
        };
    }
    return new StatusService();
});