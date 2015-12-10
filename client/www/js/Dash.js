angular.module('gloria.Dash', [])

.service('Dash', function ($http){
	console.log('hello world')
	return {
//serves all user data back to dashboard
		serveUser: function(){
			$http({
				method: 'GET',
				url: '/api/users/getUser',
			})
			.then(function (res){
				console.log('this is the user sent by the server', res.data)
				return res.data;
			})

		},
//serves users with 'shared' data
		serveUsers: function(){
			$http({
				method: 'GET',
				url: '/api/users/getPubUsers',
				data: shared
			})
			.then(function (res){
				return res.data;
			})
		}
	}
})