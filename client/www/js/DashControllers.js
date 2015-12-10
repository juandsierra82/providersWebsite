angular.module('gloria.DashControllers', ['gloria.Dash'])

	.controller('DashController', function ($scope, Dash, $window){

		$scope.user = {};

		var userobj = Dash.serveUser()
		console.log('this is the user obj', userobj[0])

	})