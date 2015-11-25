var User 				= require('./userModel.js'),
		Q						=	require('q'),
		mongoose		=	require('mongoose');


module.exports = {
	
	// test: function(){
	// 	console.log('hello world')
	// },

	addUser: function (req, res, next){
		console.log('at addUser: following user about to be added', req.body)

		var findUser 	= Q.nbind(User.findOne, User);

		var username 	= req.body.name,
				password	= req.body.password,
				shared		= req.body.shared;

		console.log('this is the information about to be put in the db', username, password, shared)

		findUser({username: username})
			.then(function (user){
				console.log('in findUser this is the user', user)
				if(!user){
					var newUser = new User();
					newUser.username = username;
					newUser.password = password;
					newUser.shared = shared;
					console.log('this is the new user',newUser)

					newUser.save(function (err){
						if (err){
							console.log('this is the error', err);
						}
						console.log('this is the newUser', newUser)
					})
				} else {
					next(new Error('User already exists'))
				}
			})
			.fail(function (error) {
        next(error);
      });
	}
	

	}
