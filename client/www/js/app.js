(function() {

	angular.module('gloria', ['gloria.controllers', 'ngRoute', 'ui.router'])

	.config(function ($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
		  .state('signup', {
        templateUrl: 'views/signup.html',
        url: '/signup',
        controller: 'AuthController'
      })

			.state('login', {
      	templateUrl: 'views/login.html',
      	url: '/login',
      	controller: 'AuthController'
    	})

    	.state('create', {
    		templateUrl: 'views/create.html',
    		url:'/create',
    		controller: 'CreateController'
    	})

	});
})()