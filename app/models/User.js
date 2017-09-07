var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//
var UserSchema = new Schema({
	firstName: {

	},
	email: {

	},
	events: {
		type: [Schema.Types.ObjectId],
		ref: "Events"
	},
});

var User = mongoose.model('User', UserSchema);
module.exports = User;