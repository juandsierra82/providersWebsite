angular.module('gloria.controllers', ['gloria.services'])

.controller('AuthController', function ($scope, $route, $location, Auth) {
//user object	
	console.log('in AuthController')
	$scope.user = {};
// //login functionality expects user data from the db
// 	$scope.login = function (){
// 		Auth.login($scope.user)
// 			.then(function (data){
// 				$location.path('/dash')
// 			})
// 	}

// //signup functionality expects auth token from the db

	$scope.signup = function (){
		$scope.user.shared = true;
		Auth.signup($scope.user)
			.then(function (){
				console.log('signup successful')
				$location.path('/create')
			})
	}
})

.controller('CreateController', function ($scope){
	console.log('in Create Controller')
  
  $scope.user = {}

})


