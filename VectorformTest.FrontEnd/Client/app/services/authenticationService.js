(function () {
    'use strict';

    app.factory('authenticationService', ['$http', '$q', '$localStorage', 'authenticationSettings', factory]);
    
    function factory($http, $q, $localStorage, authenticationSettings) {
        var serviceBase = authenticationSettings.apiServiceBaseUri;

        var _user = {
            name: '',
            isAuthenticated: false
        };

        var _register = function (data) {
            _logout();

            var deferred = $q.defer();

            $http.post(serviceBase + 'api/Account/Register', data, { headers: { 'Content-Type': 'application/json' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (data, status, header, config) {
                    deferred.reject(data);
                });

            return deferred.promise;
        };

        var _login = function (data) {
            var deferred = $q.defer();

            $http.post(serviceBase + 'Token', 'grant_type=password&username=' + data.Email + '&password=' + data.Password, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    $localStorage.authenticationData = { token: response.access_token, userName: data.Email };

                    _user.isAuthenticated = true;
                    _user.name = data.Email;

                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    _logout();

                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _logout = function () {
            delete $localStorage.authenticationData;

            _user.isAuthenticated = false;
            _user.name = '';
        };

        var _initialize = function () {
            var authenticationData = $localStorage.authenticationData;
            if (authenticationData) {
                _user.isAuthenticated = true;
                _user.name = authenticationData.userName;
            }
        };

        return {
            initialize: _initialize,
            user: _user,
            register: _register,
            login: _login,
            logout: _logout
        };
    };
})();