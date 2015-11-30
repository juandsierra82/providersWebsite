(function() {

	angular.module('gloria', ['gloria.AuthControllers', 'gloria.SettingsControllers', 'ngRoute', 'ui.router'])

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
    		templateUrl: 'views/settings.html',
    		url:'/settings',
    		controller: 'SettingsController'
    	})

      // .state('dash', {
      //   templateUrl: 'views/dash.html',
      //   url: '/dash',
      //   controller: 'DashController'
      // })

	});
})()