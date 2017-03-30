"use strict";angular.module("bitcoinViewApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngWebSocket"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("bitcoinViewApp").controller("MainCtrl",["$scope","$websocket",function(a,b){a.dataTop4=[],a.dataActual={};var c=b("wss://api.bitfinex.com/ws/v2"),d=JSON.stringify({event:"subscribe",channel:"ticker",symbol:"tBTCUSD"});c.onMessage(function(b){var c=JSON.parse(b.data);"hb"!==c[1]&&(4===a.dataTop4.length&&a.dataTop4.shift(),a.dataTop4.push(a.dataActual),a.dataActual=c)}),c.onOpen(function(){c.send(d)}),a.getDiffPrice=function(a){return a[1]-a[3]},a.getDiffSize=function(a){return a[2]-a[4]}}]),angular.module("bitcoinViewApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("bitcoinViewApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<h2>Valores Actuales</h2> <div class="col-md-12"> <ul> <li>BID : {{dataActual[1]}}</li> <li>BID_SIZE : {{dataActual[2]}}</li> <li>ASK : {{dataActual[3]}}</li> <li>ASK_SIZE : {{dataActual[4]}}</li> </ul> <h3>Diferencia de precio {{getDiffPrice(dataActual) | currency}}</h3> <h3>Diferencia de Cantidad {{getDiffSize(dataActual) | number}}</h3> </div> <h2>Ultimos 4 Valores</h2> <div class="col-md-3" ng-repeat="ind in dataTop4"> <ul> <li>BID : {{ind[1]}}</li> <li>BID_SIZE : {{ind[2]}}</li> <li>ASK : {{ind[3]}}</li> <li>ASK_SIZE : {{ind[4]}}</li> </ul> <h4>Diferencia de precio {{getDiffPrice(ind) | currency}}</h4> <h4>Diferencia de Cantidad {{getDiffSize(ind) | number}}</h4> </div>')}]);