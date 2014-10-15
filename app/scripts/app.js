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
            controller: 'TemplateCtrl',
            resolve: {
                serverTemplates: function(templateService) {
                    return templateService.loadTemplates();
                }
            }
        })
        .when('/templates/:template', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
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
    $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
        if (current !== undefined && current.$$route.originalPath === '/templates/:template' && next.$$route.originalPath === '') {
            setTimeout(function() {
                $route.reload();
            }, 2000)
        }
    });
}]);
app.service('templateService', ['$http', function($http) {
    return {
        loadTemplates: function() {
            return $http.get('http://localhost:5000/templates').success(function(data) {
                return data;
            });
        },
        loadModel: function(filename) {
            return $http.get('http://localhost:5000/templates/', {
                params: {
                    filename: filename
                }
            }).success(function(data) {
                return data;
            });
        }
    };
}])
