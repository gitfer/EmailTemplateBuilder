'use strict';

/**
 * @ngdoc directive
 * @name emailTemplateBuilderApp.directive:ngCaptureHtml
 * @description
 * # ngCaptureHtml
 */
angular.module('emailTemplateBuilderApp')
    .directive('ngCaptureTemplate', function($http, emailTemplateBuilderConfig) {
      var templateRaw;
        return {
            restrict: 'E',
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {
                        templateRaw = iElement.html();
                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                              scope.$on('getHtml', function (evt, model) {
                              var htmlWrapHead = '<ng-capture-template><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml">\n';
                              var content = templateRaw;
                              var htmlWrapTail = '\n</html></ng-capture-template>'
                              var data = htmlWrapHead + content + htmlWrapTail;
                              $http.post(emailTemplateBuilderConfig.expressjsConnectionString+':'+emailTemplateBuilderConfig.expressjsPort+'/'+emailTemplateBuilderConfig.urlPostTemplates, {data: JSON.stringify(data), model: JSON.stringify(model)});
                            });
                    }
                }
            }
        };
    });
