var UserEvents = require('../models/UserEvents');
var ApiEvents = require('../models/ApiEvents');
var Politician = require('../models/Politician');
var mongoose = require('mongoose');
var axios = require('axios');
mongoose.Promise = Promise;

var opensecretsAPIKey = 'f6c7bd41f17ff86b93da41debbc29a2b';

module.exports = function(app) {
	app.post('/event/create', function(req, res) {
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
			var donorCount=0;

			response.forEach(function(rep, index) {
				donorCount += rep.donors.length;
			});

			console.log('donor count', donorCount);

			if(donorCount>0) {
				res.json(response);
			} else {

				response.forEach(function(rep, index1, arr) {

					//then we haven't requested for donors for this state yet,
					var queryURL = 'http://www.opensecrets.org/api/?method=candIndustry&cid=' + rep.cid + '&cycle=2016&apikey=' + opensecretsAPIKey + '&output=json';
					
					axios({
						url: queryURL,
						method: 'GET',
						dataType: 'json'
					}).then((resp)=>{
						//query for each donor one by one
						var donors = [];
						resp.data.response.industries.industry.forEach(function(item, index2) {
							var donor = {};
							donor.industry = item['@attributes'].industry_name;
							donor.total = item['@attributes'].total;
							donors.push(donor);
						});

						//save into db of correct politician
						Politician.findOneAndUpdate({
							cid: rep.cid
						},{
							donors: donors
						}).exec(function(err, doc) {
							if(err) {
								console.log(err);
							} else {
								console.log('updated donors, ', doc);
							}
						});
						//if we just finished added donors
						if(index1 === arr.length-1) {
							console.log('done updating!');
							//now just request again and send back, it should be fine now, and we can just sennd back instantly
							Politican.find({
								state: req.params.state.toUpperCase()
							}).exec(function(err, response) {
								res.json(response);
							});
						}
					});

				});


			}

		});
	});

	app.get('/events/:state', function(req, res) {
		console.log('running for ', req.params.state.toUpperCase());
		ApiEvents.find({
			state: req.params.state.toUpperCase()
		}).exec(function(err, response) {
			if(err) {
				res.send(err);
			} else {
				console.log(response);
				res.json(response);
			}
		});
	});

	};