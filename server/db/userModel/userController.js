var User 				= require('./userModel.js'),
		Q						=	require('q'),
		mongoose		=	require('mongoose');




module.exports = {
	findUser: function(req, res, next){

	},
	
	addUser: function (req, res, next){
		console.log('at addUser: following user about to be added', req.body)

		var findUser 	= Q.nbind(User.findOne, User);

		var username 	= req.body.username,
				email 		= req.body.email;

		console.log('this is the information about to be put in the db', username, email)

		findUser({email: email})
			.then(function (user){
				if(!user){
					var newUser = new User ();
					newUser.username = username;
					newUser.email = email;
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
	},
	

	}
