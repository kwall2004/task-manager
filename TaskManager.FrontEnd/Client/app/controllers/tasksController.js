(function () {
    'use strict';

    app.controller('tasksController', ['$scope', '$location', '$uibModal', '$mdDialog', 'authenticationService', 'tasksService', controller]);

    function controller($scope, $location, $uibModal, $mdDialog, authenticationService, tasksService) {
        $scope.tasks = [];
        $scope.showingActive = true;
        $scope.showingCompleted = true;

        if (!authenticationService.user.isAuthenticated) {
            $location.path('/login');
        }
        else {
            tasksService.getTasks().then(
                 function (response) {
                     $scope.tasks = response.data;
                     $scope.filteredTasks = _.filter($scope.tasks, function (o) {
                         return true;
                     });
                 },
                 function (response) {
                     alert(response.data.Message);
                 }
            );
        };

        $scope.addTask = function (event) {
            $mdDialog.show({
                controller: 'taskController',
                templateUrl: 'Client/app/views/task.html',
                targetEvent: event,
                clickOutsideToClose: true
            }).then(
                function (task) {
                    $scope.tasks.push(task);
                    filter();
                }, function () {
                    //cancel
                }
            );
        };

        $scope.deleteTasks = function (event) {
            var confirm = $mdDialog.confirm()
                .title('Delete selected tasks?')
                .ariaLabel('Delete confirm')
                .targetEvent(event)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(
                function () {
                    _.forEach($scope.selected, function (task) {
                        tasksService.deleteTask(task).then(
                            function (response) {
                                _.remove($scope.tasks, function (o) {
                                    return o.Id == response.Id;
                                });
                                _.remove($scope.selected, function (o) {
                                    return o.Id == response.Id;
                                });
                                filter();
                            },
                            function (response) {
                            }
                        );
                    });
                },
                function () {
                    //cancel
                }
            );
        };

        $scope.isCompletedChanged = function (task) {
            tasksService.changeTask(task).then(
                 function (response) {
                 },
                 function (response) {
                 }
            );
        };

        $scope.selected = [];

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.isIndeterminate = function () {
            return ($scope.selected.length !== 0 &&
                $scope.selected.length !== $scope.tasks.length);
        };

        $scope.isChecked = function () {
            return ($scope.selected.length > 0 &&
                $scope.selected.length === $scope.tasks.length);
        };

        $scope.toggleAll = function () {
            if ($scope.selected.length === $scope.tasks.length) {
                $scope.selected = [];
            } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                $scope.selected = $scope.tasks.slice(0);
            }
        };

        var filter = function () {
            $scope.filteredTasks = _.filter($scope.tasks, function (o) {
                return ($scope.showingCompleted || !o.IsCompleted) && ($scope.showingActive || o.IsCompleted);
            });
        };

        $scope.toggleShowCompleted = function () {
            $scope.showingCompleted = !$scope.showingCompleted;
            filter();
        };

        $scope.toggleShowActive = function () {
            $scope.showingActive = !$scope.showingActive;
            filter();
        };

        $scope.$watch('tasks', function (newValue, oldValue) {
            $scope.activeTaskCount = _.filter($scope.tasks, function (o) {
                return !o.IsCompleted;
            }).length;
        }, true);
    };
})();