var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StateSchema = new Schema({
	politicians: {
		type: [Schema.Types.ObjectId],
		ref: "Politician"
	}
});

var State = mongoose.model('State', StateSchema);

module.exports = State;