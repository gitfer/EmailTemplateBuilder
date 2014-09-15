'use strict';

var app = angular.module('emailTemplateBuilderApp', ['ngSanitize', 'ngRoute', 'ngDraggable', 'ui.tinymce']);

app.factory('_', ['$window',
      function($window) {
        // place lodash include before angular
        return $window._;
      }
    ]);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/selectTemplate.html',
		controller: 'TemplateCtrl'
	})
	.when('/templates/:template', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	})
	.otherwise({ redirectTo: '/error' });
}]);