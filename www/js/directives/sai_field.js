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
            req: "=req",
            mustEqual: "@mustEqual"
        },
        link: function (scope, elem) {
            // Validation
            scope.form = scope.$parent[elem[0].parentNode.name];
        },
        controller: function($scope){

            if($scope.mustEqual){
                var w = $scope.$watch('model', function(){
                    if($scope.form && $scope.model){
                        var mustEqualObj = $scope.form[$scope.mustEqual];
                        if($scope.model!==mustEqualObj.$modelValue){
                            // Throw Error
                            $scope.form[$scope.name].$dirty = true;
                            $scope.form[$scope.name].$invalid = true;
                        }else{
                            // Show Success
                            $scope.form[$scope.name].$dirty = false;
                            $scope.form[$scope.name].$invalid = false;
                        }
                    }
                });

                // Destroy the active watcher
                $scope.$on('$destroy', function () {
                    w();
                });
            }
        }
    };
});