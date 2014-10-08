'use strict';

describe('Directive: ngCaptureHtml', function () {

  // load the directive's module
  beforeEach(module('emailTemplateBuilderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-capture-html></ng-capture-html>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngCaptureHtml directive');
  }));
});
