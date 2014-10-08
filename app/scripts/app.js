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
		controller: 'TemplateCtrl',
		resolve: {
			serverTemplates: function (templateService) {
				return templateService.loadTemplates();
			}
		}
	})
	.when('/templates/:template', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	})
	.otherwise({ redirectTo: '/error' });
}]);
app.service('templateService', ['$http', function ($http) {
	return {
		loadTemplates: function () {
			return $http.get('http://localhost:3000/templates').success(function (data) {
				console.log(data.length + ' provenienti dal server');
				return data;
			});
		}
	};	
}])