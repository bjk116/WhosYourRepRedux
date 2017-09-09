var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserEventSchema = new Schema({
	//initial
	state: {
		type: String
	}
	title: {
		type: String
	},
	start: {
		type: Date
	},
	end: {
		type: Date
	},
	desc: {
		type: String
	},
	cause: {
		type: String
	},
	upvotes: {
		type: Number,
		default: 0
	}
});

var UserEvents = mongoose.model('UserEvents', UserEventSchema);
module.exports = UserEvents;