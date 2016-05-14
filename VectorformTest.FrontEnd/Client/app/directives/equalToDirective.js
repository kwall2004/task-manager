(function () {
    'use strict';

    app.directive('equalTo', directive);

    function directive() {
        var _scope = {
            otherModelValue: '=equalTo'
        };

        var _link = function (scope, element, attributes, ngModelController) {
            ngModelController.$validators.equalTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch('otherModelValue', function () {
                ngModelController.$validate();
            });
        };

        return {
            require: 'ngModel',
            scope: _scope,
            link: _link
        };
    };
})();