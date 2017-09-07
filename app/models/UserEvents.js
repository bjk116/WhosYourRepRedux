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
	politicians: {
		type: Schema.Types.ObjectId,
		ref: "Politician"
	}
});

var UserEvents = mongoose.model('UserEvents', UserEventSchema);

module.exports = UserEvents;