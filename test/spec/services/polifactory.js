'use strict';

describe('Service: PoliFactory', function () {

  // load the service's module
  beforeEach(module('ng32App'));

  // instantiate service
  var PoliFactory;
  beforeEach(inject(function (_PoliFactory_) {
    PoliFactory = _PoliFactory_;
  }));

  it('should do something', function () {
    expect(!!PoliFactory).toBe(true);
  });

});
