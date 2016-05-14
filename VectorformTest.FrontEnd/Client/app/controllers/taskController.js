(function () {
    'use strict';

    app.controller('taskController', ['$scope', '$mdDialog', 'tasksService', controller]);
    
    function controller($scope, $mdDialog, tasksService) {
        $scope.task = {};
        $scope.errors = [];

        $scope.ok = function () {
            tasksService.addTask($scope.task).then(
                function (response) {
                    $scope.errors = [];
                    $mdDialog.hide(response);
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

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    };
})();