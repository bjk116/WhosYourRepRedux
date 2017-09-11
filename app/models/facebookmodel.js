var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FacebookUserSchema = new Schema({
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

var FacebookUser = mongoose.model('FacebookUser', FacebookUserSchema);
module.exports = FacebookUser;