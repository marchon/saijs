'use strict';

angular.module('saijs').directive('holderFix', function () {
    return {
        link: function (scope, element, attrs) {
            if(env!='test'){
                Holder.run({ images: element[0], nocss: true });
            }
        }
    };
});
