'use strict';

/**
 * @ngdoc function
 * @name bitcoinViewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bitcoinViewApp
 */
angular.module('bitcoinViewApp')
  .controller('MainCtrl', function ($scope,$websocket) {
    $scope.data = [];

    var dataStream = $websocket('wss://api.bitfinex.com/ws/v2');
	var msg = JSON.stringify({ 
	  event: 'subscribe', 
	  channel: 'ticker', 
	  symbol: 'tBTCUSD' 
	});


	dataStream.onMessage(function(message) {
	    $scope.data.push(JSON.parse(message.data));
	});
	dataStream.onOpen(function() {
	    dataStream.send(msg);
	});

  });
