angular.module('gloria.Settings', [])

.factory('Settings', Settings)

function Settings ($http, $location, $window){
	function test(){
		console.log('in settings factory')
	};

	function changeSettings (userSettings){
		return $http({
			method: 'POST',
			url: 'api/users/settings',
			data: userSettings
		})
			.then(function (res){
				console.log('this is the data received by the server', res.data)
				return res.data;
			})
	}

	return {
		test: test
	}
}