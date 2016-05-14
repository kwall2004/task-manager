(function () {
    'use strict';

    app.directive('enterKey', directive);

    function directive() {
        var _link = function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.enterKey, { 'event': event });
                    });

                    event.preventDefault();
                }
            });
        };

        return {
            link: _link
        }
    };
})();