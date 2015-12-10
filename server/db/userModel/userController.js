var User 				= require('./userModel.js'),
		Q						=	require('q'),
		jwt  = require('jwt-simple'),
		mongoose		=	require('mongoose');


module.exports = {
  login: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                req.session.userId = user._id;
                res.json({token: token, userid: user._id});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username  = req.body.name,
        password  = req.body.password,
        //crating shared property on req on sign up
        shared = req.body.shared,
        create,
        newUser;

    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        if (user) {
          next(new Error('User already exists!'));
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password,
            //setting the shared property to false so user will be private on signup
            shared: shared
          };
          return create(newUser);
        }
      })
      .then(function (user) {
      	console.log('this is the req', req, 'this is the session', req.session)
        req.session.userId = user._id;
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        //the user id is included in the encoded token 
        //that is sent back, but the front end has no way
        //of decoding token
        //the front end needs the user id in order to properly make
        //requests to the server

        res.json({token: token, userid: user._id});
      })
      .fail(function (error) {
        next(error);
      });
  },

  logout: function (req, res, next) {
    delete req.session.userId;
    res.send(200);
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    // if (!token) {
    //   next(new Error('No token'));
    // } else {
    //   var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      var userId = req.session.userId;
      findUser({_id: userId})
        .then(function (foundUser) {
          if (foundUser) {
            next();
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
  },

  //update user profile

  update: function(req, res, next){
    console.log('calling update on userID for session: ', req.session.userId);
    //fields expected for user profile

    var shared = req.body.shared;
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var daycare = req.body.daycare;
    var address = req.body.address;
    var email = req.body.email;

    var updateUser = Q.nbind(User.update, User);
    var userId = req.session.userId;
      console.log('updating infor for: ', req.session.userId)
    //updating user
    updateUser({_id:userId}, {$set: {
      shared: shared,
      firstName: firstName,
      lastName: lastName,
      address: address,
      daycare: daycare,
      email: email
      }
    })
      .then(function (user){
        console.log('user doc after update: ', user)
        if(!user){
          console.log('error user does not exist--check authorization controller')
          res.send(401);
        } else {
          res.send(user);
        }
      })
      .fail(function (error){
        console.log('unable to update. error: ', error)
        next(error);
      })

  },
  //separating serveUser from checkAuth in case we want to store more user data than we want to serve back to the user also allows us to query a different table for info on the daycare, using a ref.

  serveUser: function(req, res, next){
    console.log('serving data for userID', req.session.userId);

    var userId = req.session.userId;
    var findOne = Q.nbind(User.find, User);
    findOne({_id: userId})
      .then(function (user){
        console.log('user queried: ', user);
        if (user){
        res.json(user);
        } else {
          res.send(401);
        }
      })
      .fail(function (error){
        console.log('unable to serve user. Error: ', error)
          next(error);
      })

  },

  servePublic: function(req, res, next){
    console.log('User ', req.session.userId, ' requests all public data');
    var findPublic = Q.nbind(User.find, User)

    findPublic({shared: false}, '_id username')
      .then(function (publicUsers){
        console.log('this should be an array of users', publicUsers)
      
        if (publicUsers){
          res.json(publicUsers)
        } else {
          res.send(401);
        }
      })
      .fail(function (error){
        console.log('unable to serve. error: ', error)
        next(error);
      })
  }

}

