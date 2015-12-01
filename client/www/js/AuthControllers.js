angular.module('gloria.AuthControllers', ['gloria.AuthServices'])

.controller('AuthController', function ($scope, $route, $location, Auth, $window) {
//user object	
	console.log('in AuthController')
	$scope.user = {};
// //login functionality expects user data from the db
  $scope.login = function () {
    Auth.login($scope.user)
      .then(function (data) {
        $window.localStorage.setItem('com.settings', data);
        $window.localStorage.setItem('userid', data.userid);
        // $location.path('/dash');
      })
      .catch(function (error) {
        $scope.user.error = "Username and/or password is incorrect.";
        console.error(error);
      });
  };

// //signup functionality expects auth token from the db

	$scope.signup = function (){
		$scope.user.shared = true;
		Auth.signup($scope.user)
			.then(function (data){
				$window.localStorage.setItem('com.provider', data.token);
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



