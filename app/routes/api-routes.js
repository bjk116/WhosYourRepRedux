var UserEvents = require('../models/UserEvents');
var Politician = require('../models/Politician');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = function(app) {
	app.post('/user/create', function(req, res) {
		console.log(req.body);
	});

	app.get('/getAllNames', function(req, res) {
		Politician.find({})
		.exec(function(err, response) {
			var names = '';
			response.forEach(function(item) {
				names+="\"" + item.name+"\""+',';
			});
			res.json({names:names});
		});
	});

	app.get('/reps/:state', function(req, res) {
		Politician.find({
			state: req.params.state.toUpperCase()
		}).exec(function(err, response) {
			console.log(response);
			res.json(response);
		});

	})
};