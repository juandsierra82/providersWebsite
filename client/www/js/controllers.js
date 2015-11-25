angular.module('gloria.controllers', ['gloria.services'])

.controller('AuthController', function ($scope, $route, $location, Auth, $window) {
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
			.then(function (data){
				$window.localStorage.setItem('com.spkr', data.token);
        $window.localStorage.setItem('userid', data.userid);
				$location.path('/create');
			})
			.catch(function (error){
				console.log('this is the error', error)
				$scope.user.error = ""+error.data;
				throw error;
			})
	}
})

.controller('CreateController', function ($scope){
	console.log('in Create Controller')
  
  $scope.user = {}

})


