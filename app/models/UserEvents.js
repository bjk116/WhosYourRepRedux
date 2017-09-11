var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserEventSchema = new Schema({
	//initial
	//change this to Schema.type.ObjectId, ref: User in future
	creator: {
		type: String
	},
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
	//to be used in trending area
	upvotes: {
		type: Number,
		default: 0
	}
});

var UserEvents = mongoose.model('UserEvents', UserEventSchema);
module.exports = UserEvents;