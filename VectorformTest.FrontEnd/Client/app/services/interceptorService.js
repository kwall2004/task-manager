(function () {
    'use strict';

    app.factory('interceptorService', ['$q', '$injector','$location', '$localStorage', factory]);
    
    function factory($q, $injector, $location, $localStorage) {
        var _request = function (config) {
            config.headers = config.headers || {};

            var authenticationData = $localStorage.authenticationData;
            if (authenticationData) {
                config.headers.Authorization = 'Bearer ' + authenticationData.token;
            }

            return config;
        };

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                var authenticationService = $injector.get('authenticationService');
                authenticationService.logout();
                $location.path('/login');
            }

            return $q.reject(rejection);
        };

        return {
            request: _request,
            responseError: _responseError
        };
    };
})();