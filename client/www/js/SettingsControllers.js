angular.module('gloria.SettingsControllers', ['gloria.Settings'])

.controller('SettingsController', function ($scope, Settings, $window){
	Settings.test();
	console.log('in Create Controller')
	$scope.user = {};

	$scope.update = function(){
		$scope.user.id = $window.localStorage.userid
		Settings.changeSettings($scope.user)
			.then(function (data){
				console.log('this is the user settings', data)
				$window.localStorage.setItem('com.settings', data);
        // $location.path('/dash');
      })
      .catch(function (error) {
      	console.log('this is the error ', error)
        $scope.user.error = console.log(error)
      });
	}  

})
