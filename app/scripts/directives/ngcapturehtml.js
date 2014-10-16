'use strict';

/**
 * @ngdoc directive
 * @name emailTemplateBuilderApp.directive:ngCaptureHtml
 * @description
 * # ngCaptureHtml
 */
angular.module('emailTemplateBuilderApp')
  .directive('ngCaptureHtml', function ($http, emailTemplateBuilderConfig) {
    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	scope.$on('getHtml', function () {
      		var htmlWrapHead = '<ng-capture-template><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml">\n';
      		var content = element.find('div').html();
      		var htmlWrapTail = '\n</html></ng-capture-template>';
      		var data = htmlWrapHead + content + htmlWrapTail;
      		if(attrs.ngPersist !== undefined && attrs.ngPersist === 'true'){
      			$http.post(emailTemplateBuilderConfig.urlPostStaticTemplates, {data: JSON.stringify(data)});
      		}else{
      			console.log(data);
      		}
      	});
      }
    };
  });
