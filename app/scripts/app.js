'use strict';

var app = angular.module('emailTemplateBuilderApp', [ 'EmailTemplateBuilder.config', 'angularUtils', 'ngRoute', 'ngDraggable', 'ui.tinymce']);

app.factory('_', ['$window',
    function($window) {
        // place lodash include before angular
        return $window._;
    }
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/selectTemplate.html',
            controller: 'templateCtrl',
            resolve: {
                serverTemplates: function(templateService) {
                    return templateService.loadTemplates();
                }
            }
        })
        .when('/templates/:template', {
            templateUrl: 'views/main.html',
            controller: 'mainCtrl',
            resolve: {
                serverModels: ['$route', 'templateService', function($route, templateService) {
                    return templateService.loadModel($route.current.params.template);
                }]
            }
        })
        .otherwise({
            redirectTo: '/error'
        });
}]).run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
        if (current !== undefined && current.$$route.originalPath === '/templates/:template' && next.$$route.originalPath === '') {
            setTimeout(function() {
                $route.reload();
            }, 2000);
        }
    });
}]);
