var express     = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('./db/db.js');
var app = express();

	app.use(morgan('dev'));


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