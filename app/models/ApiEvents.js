var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApiEventSchema = new Schema({
	//initial of state
	state: {
		type: String
	},
	beneficiaries: {
		type: [String]
	},
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
	}
});

var ApiEvents = mongoose.model('ApiEvents', ApiEventSchema);

module.exports = ApiEvents;