(function () {
    'use strict';

    app.controller('indexController', ['$scope', '$location', 'authenticationService', controller]);

    function controller($scope, $location, authenticationService) {
        $scope.logout = function () {
            authenticationService.logout();
            $location.path('/login');
        };

        $scope.user = authenticationService.user;
    };
})();