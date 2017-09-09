var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//title
//start
//end
//description

var PoliticianSchema = new Schema({
	//initial
	cid: {
		type: String
	},
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
	twitterHandle: {
		type: String
	},
	relectionDate: {
		type: Date
	},
	proposedBills: {
		type: String
	}
});

var Politician = mongoose.model('Poltiician', PoliticianSchema);

module.exports = Politician;