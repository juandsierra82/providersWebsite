var express     = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('./db/db.js');
var app = express();
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');

	app.use(morgan('dev'));

//serves the cookie session to the request
	app.use(cookieSession({
    keys:['key1', 'key2']
  }));

  app.use(cookieParser());

  app.use(function(req, res, next) {
    if (!req.session.voted) {
      req.session.voted = false;
    }
    next();
  });


	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	//client side pages served up

	app.use('/',express.static(__dirname + '../../client/www'));

	//routers

	var userRouter = express.Router();
	

	app.use('/api/users', userRouter);



	//db routes set up commented out

	require('./db/userModel/userRoutes.js')(userRouter);



  //connection to db
	mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/providers');

	module.exports = app;