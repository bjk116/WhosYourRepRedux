var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IndustrySchema = new Schema({
	industryName: {
		type: String
	},
	totalAmount: {
		type: Number
	}
});

var Politician = mongoose.model('Politician', PoliticianSchema);

module.exports = Politician;