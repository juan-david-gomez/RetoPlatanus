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

    $scope.dataTop4 = [];
    $scope.dataActual = {};



    var dataStream = $websocket('wss://api.bitfinex.com/ws/v2');
	var subscribeRequest = JSON.stringify({ 
	  event: 'subscribe', 
	  channel: 'ticker', 
	  symbol: 'tBTCUSD' 
	});


	dataStream.onMessage(function(message) {
		var dataWs = JSON.parse(message.data);

		if (dataWs[1] !== "hb") {
			if ($scope.dataTop4.length === 4) {
				$scope.dataTop4.shift();
			}
			$scope.dataTop4.push($scope.dataActual);
	    	$scope.dataActual = dataWs;
		}
	});
	dataStream.onOpen(function() {
	    dataStream.send(subscribeRequest);
	});


	$scope.getDiffPrice = function (obj) {
		return obj[1] - obj[3];
	};
	$scope.getDiffSize = function (obj) {
		return obj[2] - obj[4];
	};

  });
