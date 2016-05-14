(function () {
    'use strict';

    app.controller('loginController', ['$scope', '$location', 'authenticationService', controller]);
    
    function controller($scope, $location, authenticationService) {
        $scope.data = {};
        $scope.errors = [];

        $scope.login = function () {
            authenticationService.login($scope.data).then(
                function (response) {
                    $scope.errors = [];
                    $location.path('/tasks');
                },
                function (err) {
                    $scope.errors = [];
                    $scope.errors.push(err.error_description);
                }
            );
        };
    };
})();
