angular.module('gloria.SettingsControllers', ['gloria.Settings'])

.controller('SettingsController', function ($scope, Settings){
	Settings.test();
	console.log('in Create Controller')
  

})
