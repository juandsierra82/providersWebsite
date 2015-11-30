angular.module('gloria.Settings', [])

.factory('Settings', Settings)

function Settings ($http, $location, $window){
	function test(){
		console.log('in settings factory')
	}

	return {
		test: test
	}
}