angular.module('gloria.controllers', [])

.controller('AuthController', function ($scope, $route, $location, $Auth) {
//user object	
	$scope.user = {};
	$scope.user.err = '';
	console.log('in AuthController')

//login functionality expects user data from the db
	$scope.login = function (){
		Auth.login($scope.user)
			.then(function (data){
				$location.path('/dash')
			})
	}

//signup functionality expects auth token from the db

	$scope.signup = function (){
		Auth.signup($scope.user)
			.then(function (token){
				$location.path('/create')
			})
	}
})

.controller('CreateController', function ($scope){
	console.log('in Create Controller')

})


