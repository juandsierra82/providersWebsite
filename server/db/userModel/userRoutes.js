var userController = require('./userController.js');

module.exports = function (app){

	app.post('/signup', userController.signup);
	app.post('/login', userController.login);
	app.get('/logout', userController.checkAuth, userController.logout);
	app.post('/settings', userController.update)
	app.get('/settings', userController.serve)

}