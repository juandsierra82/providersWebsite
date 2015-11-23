angular.module('starter', ['starter.controllers', 'starter.services'])

	.config(function ($routeProvider, $httpProvider){
	   $routeProvider
	

		.when('/login', {
      templateUrl: 'www/views/login.html',
      controller: 'AuthController'
  	})

  	.otherwise('/login')

	});