'use strict';

/*
 * * * * * * * * * * * * * * * * * * * * * *
 * -Implementation Example-
 *
 * <form name="your_form_name">
 *      <sai-field type='email' label="Email" name="username" model="user.username"></sai-field>
 * </form>
 *
 * -Attributes-
 *      label:  [Field Label]
 *      name:   [Field Name](required)
 *      req:    [Required Boolean]
 *      type:   [Field Type](required)
 *      model:  [Model Reference] (required)
 *      max:    [Max Field Length]
 *      min:    [Min Field Length]
 * */
app.directive("saiField", function () {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/sai_field.html',
        scope: {
            name: "@name",
            model: "=model",
            label: "@label",
            max: "@max",
            min: "@min",
            type: "@type",
            req: "=req"
        },
        link: function(scope, elem) {
            // Validation
            scope.form = scope.$parent[elem[0].parentNode.name];
        }
    };
});