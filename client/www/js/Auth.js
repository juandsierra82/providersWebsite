angular.module('gloria.AuthServices', [])

.service('Auth', function ($http) {
  return {
    //using services and not factories for signin/sign up to allow for $scope change

    signup: function (user){
      console.log('at service signup: this is the user', user)
    return  $http({
              method: 'POST',
              url: '/api/users/signup',
              data: user
               })
               .then(function (res){
                 console.log('this is the data received by the server', res.data)
                return res.data;
               });

    },

    login: function (user){
      console.log('at service login: this is the user', user)
      return 
        $http({
          method: 'POST',
          url: '/api/users/signin',
          data: user
        })
        .then(function (res){
          console.log('this is the data sent to the server', res.data)
          return res.data
        })
    },

    logout: function(){
      console.log('at service logout')
      return $http({
        method: 'GET',
        url: '/api/users/logout',
      })
      .then(function() {
        $window.localStorage.removeItem('com.provider');
        $window.localStorage.removeItem('userid');
        $rootScope.withBackground = true;
        $location.path('/');
      })
    },

    isAuth: function(){
      return !!$window.localStorage.getItem('com.provider')
    }

  };
});