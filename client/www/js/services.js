angular.module('gloria.services', [])

.service('Auth', function ($http) {
  return {
    signup: function (user){
      console.log('at service this is the user', user)
    return  $http({
              method: 'POST',
              url: '/api/users/signup',
              data: user
               })
               .then(function (res){
                 console.log('this is the data sent to the server', res.data)
                return res.data;
               });

        }
    }
})