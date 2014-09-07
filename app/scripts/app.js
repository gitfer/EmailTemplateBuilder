'use strict';

var app = angular.module('emailTemplateBuilderApp', ['ngSanitize', 'ngDraggable']);

app.factory('_', ['$window',
      function($window) {
        // place lodash include before angular
        return $window._;
      }
    ]);