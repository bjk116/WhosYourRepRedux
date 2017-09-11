var UserEvents = require('../models/UserEvents');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = function(app) {
	app.post('/user/create', function(req, res) {
		console.log(req.body);
	});
};