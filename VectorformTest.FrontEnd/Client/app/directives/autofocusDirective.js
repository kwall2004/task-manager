(function () {
    'use strict';

    app.directive('autofocus', ['$timeout', directive]);

    function directive($timeout) {
        var _link = function ($scope, $element, attrs) {
            $timeout(function () {
                $element[0].focus();
            });
        };

        return {
            link: _link
        };
    };
})();
