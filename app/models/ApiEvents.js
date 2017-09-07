var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApiEventSchema = new Schema({
	//initial of state
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
	//optional here
	politicians: {
		type: Schema.Types.ObjectId,
		ref: "Politician"
	},
	cause: {
		type: String
	}
});

var ApiEvents = mongoose.model('ApiEvents', ApiEventSchema);

module.exports = ApiEvents;