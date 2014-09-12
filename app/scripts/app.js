'use strict';

var app = angular.module('emailTemplateBuilderApp', ['ngSanitize', 'ngDraggable', 'ui.tinymce']);

app.factory('_', ['$window',
      function($window) {
        // place lodash include before angular
        return $window._;
      }
    ]);