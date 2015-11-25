var userController = require('./userController.js');

module.exports = function (app){

	app.post('/signup', userController.signup);
	app.post('/signin', userController.login);

}