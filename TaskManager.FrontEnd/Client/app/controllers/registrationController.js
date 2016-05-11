(function () {
    'use strict';

    app.controller('registrationController', ['$scope', '$location', '$timeout', 'authenticationService', controller]);
    
    function controller($scope, $location, $timeout, authenticationService) {
        $scope.data = {};
        $scope.errors = [];

        $scope.register = function () {
            authenticationService.register($scope.data).then(
                function (response) {
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
                },
                function (response) {
                    $scope.errors = [];
                    _.forEach(response.ModelState, function (key) {
                        _.forEach(key, function (error) {
                            $scope.errors.push(error);
                        });
                    });
                }
            );
        };
    };
})();