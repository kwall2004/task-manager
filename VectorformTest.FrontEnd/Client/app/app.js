
var app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'ngStorage',
    'angular-loading-bar',
    'ngMaterial'
]);

app.config(function ($routeProvider) {
    $routeProvider.when('/login', {
        controller: 'loginController',
        templateUrl: '/Client/app/views/login.html'
    });

    $routeProvider.when('/register', {
        controller: 'registrationController',
        templateUrl: '/Client/app/views/registration.html'
    });

    $routeProvider.when('/tasks', {
        controller: 'tasksController',
        templateUrl: '/Client/app/views/tasks.html'
    });

    $routeProvider.otherwise({ redirectTo: '/tasks' });
});

app.constant('authenticationSettings', {
    apiServiceBaseUri: 'http://localhost:62386/'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('interceptorService');
});

app.run(['$rootScope', 'authenticationService', function ($rootScope, authenticationService) {
    authenticationService.initialize();
}]);


