angular.module('gloria.SettingsControllers', ['gloria.Settings'])

.controller('SettingsController', function ($scope, Settings, $window){
	Settings.test();
	console.log('in Create Controller')
	$scope.user = {};
	$scope.updated = false;

	$scope.update = function(){
		$scope.user.id = $window.localStorage.userid;
		Settings.changeSettings($scope.user)
			.then(function (data){
				if(data.ok === 1 && data.nModified ===1){
					$scope.updated = true;
				} else {
					$scope.updated = false;
					alert('User information remains the same, please update before continueing')
				}
				// $window.localStorage.setItem('com.settings', data);
        // $location.path('/dash');
      })
      .catch(function (error) {
      	console.log('this is the error ', error)
        $scope.user.error = console.log(error)
      });
	};

	$scope.change = function(){
		console.log('needs revision')
		$scope.updated = false;
	}

	$scope.confirm = function(){
		if($scope.updated===true){
		console.log('confirmed')
		$location.path('/dash')
		} 
	}
})
