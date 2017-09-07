var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//title
//start
//end
//description

var PoliticianSchema = new Schema({
	//initial
	state: {
		type: String
	}
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	party: {
		type: String
	},
	donors: {
		type: String
	},
	events: {
		type: [Schema.Types.ObjectId],
		ref: "ApiEvents"
	}
});

var Politician = mongoose.model('Poltiician', PoliticianSchema);

module.exports = Politician;