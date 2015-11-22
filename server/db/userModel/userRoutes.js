var 	mongoose 	= require('mongoose'),
			Schema		=	mongoose.Schema;

var UserSchema = new mongoose.Schema({
	
	username: {
		type: String,
		required: true,
		unique: false
	},

	password: {
		type: String,
		required: true,
		unique: false
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	address: {
		type: String,
		required: false,
    unique: false
	},

	shared: {
		type: Boolean,
		required: true
	}


});

module.exports = mongoose.model('Users', UserSchema);