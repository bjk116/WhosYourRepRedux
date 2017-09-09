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
	proPublicaId: {
		type: String
	},
	position: {
		type: String
	},
	name:{
		type: String
	},
	party: {
		type: String
	},
	donors: {
		type: []
	},
	twitterHandle: {
		type: String
	},
	endOfTerm: {
		type: Date
	},
	roles: {
		type: [String]
	}
});

var Politician = mongoose.model('Politician', PoliticianSchema);

module.exports = Politician;