'use strict';

describe('Service: wsBitcoin', function () {

  // load the service's module
  beforeEach(module('bitcoinViewApp'));

  // instantiate service
  var wsBitcoin;
  beforeEach(inject(function (_wsBitcoin_) {
    wsBitcoin = _wsBitcoin_;
  }));

  it('should do something', function () {
    expect(!!wsBitcoin).toBe(true);
  });

});
