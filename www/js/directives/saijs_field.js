'use strict';

app.directive("saijsField", function () {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/saijs_field.html',
        scope: {
            form: "=form",
            fieldName: "@fieldName",
            model: "=model",
            label: "@label"
        }
    };
});