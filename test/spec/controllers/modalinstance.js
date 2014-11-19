'use strict';

describe('Controller: ModalinstancectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('ng32App'));

  var ModalinstancectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalinstancectrlCtrl = $controller('ModalinstancectrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
