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
    $scope.dataActual = {};

    var dataStream = $websocket('wss://api.bitfinex.com/ws/v2');
	var msg = JSON.stringify({ 
	  event: 'subscribe', 
	  channel: 'ticker', 
	  symbol: 'tBTCUSD' 
	});


	dataStream.onMessage(function(message) {
		var dataWs = JSON.parse(message.data);
		if (dataWs[1] !== "hb") {
	    	$scope.data.push(dataWs);
	    	$scope.dataActual = dataWs;
		}
	});
	dataStream.onOpen(function() {
	    dataStream.send(msg);
	});


	$scope.getDiffPrice = function (obj) {
		return obj[1] - obj[3];
	};
	$scope.getDiffSize = function (obj) {
		return obj[2] - obj[4];
	};

  });
