(function() {

	angular.module('gloria', ['gloria.controllers', 'ngRoute', 'ui.router'])

	.config(function ($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('login', {
      templateUrl: 'views/login.html',
      url: '/login',
      controller: 'AuthController'
    })

	});
})()