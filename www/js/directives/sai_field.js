'use strict';

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
 *      mustEqual: [The name of the field which needs to be equal to this one] See documentation:
 *
 * -Must Equal:
 *  When using the must-equal directive, you must declare the field in which you are comparing against before the
 *  sai-field with the 'must-equal' directive. For Example:
 *
 *   <sai-field type='password' label="Password" name="password" model="user.password" req="true"></sai-field>
 *   <sai-field type='password' label="Confirm Password" name="confirm_password" model="user.confirm_password"
 *         req="true" must-equal="password"></sai-field>
 *
 *  Do not daisy chain with the must-equal directive.
 *
 *  Supported types:
 *  text, password, email
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
            if (scope.$parent[elem[0].parentNode.name]) {
                // Assign Form
                scope.form = scope.$parent[elem[0].parentNode.name];
            } else {
                throw new Error("Parent scopes form could not be reached. ");
            }
        },
        controller: function ($scope) {

            function _matchError(name1, name2, val1, val2) {
                var bool = (val1 !== val2);
                $scope.matchError = bool;

                $scope.form[name1].$dirty = bool;
                $scope.form[name1].$invalid = bool;
                $scope.form[name2].$dirty = bool;
                $scope.form[name2].$invalid = bool;
                $scope.form.$invalid = bool;
            }

            if ($scope.mustEqual) {
                // Current Model Watch
                var w = $scope.$watch('model', function () {
                    if ($scope.form && $scope.model) {
                        var mustEqualObj = $scope.form[$scope.mustEqual];
                        _matchError($scope.name, $scope.mustEqual, $scope.model, mustEqualObj.$modelValue);
                    }
                });

                // Watch the previous sibling, namely the one we are comparing against.
                var w2 = $scope.$watch('$$prevSibling.model', function () {
                    if ($scope.$$prevSibling.model) {
                        // Check that $$prevSibling is the right one.
                        if ($scope.$$prevSibling.name !== $scope.mustEqual) {
                            w2();
                            throw new Error("$scope.$$prevSibling must reference the "
                                + "comparable value when using the mustEqual directive.");
                        }
                        _matchError($scope.name, $scope.mustEqual, $scope.model, $scope.$$prevSibling.model);
                    }
                });

                // Destroy the active watcher
                $scope.$on('$destroy', function () {
                    //log("before", $scope.$$watchers.length);
                    w();
                    w2();
                    //log("after", $scope.$$watchers.length);
                });
            }
        }
    };
});