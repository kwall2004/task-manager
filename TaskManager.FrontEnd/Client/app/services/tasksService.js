(function () {
    'use strict';

    app.factory('tasksService', ['$http', '$q', 'authenticationSettings', factory]);
    
    function factory($http, $q, authenticationSettings) {
        var serviceBase = authenticationSettings.apiServiceBaseUri;

        var _getTasks = function () {
            return $http.get(serviceBase + 'api/Tasks').then(function (results) {
                return results;
            });
        };

        var _addTask = function (task) {
            var deferred = $q.defer();

            $http.post(serviceBase + 'api/Tasks', task)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (data, status, header, config) {
                    deferred.reject(data);
                });

            return deferred.promise;
        };

        var _changeTask = function (task) {
            var deferred = $q.defer();

            $http.put(serviceBase + 'api/Tasks/' + task.Id, task)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (data, status, header, config) {
                    deferred.reject(data);
                });

            return deferred.promise;
        };

        var _deleteTask = function (task) {
            var deferred = $q.defer();

            $http.delete(serviceBase + 'api/Tasks/' + task.Id)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (data, status, header, config) {
                    deferred.reject(data);
                });

            return deferred.promise;
        };

        return {
            getTasks: _getTasks,
            addTask: _addTask,
            changeTask: _changeTask,
            deleteTask: _deleteTask
        };
    };
})();