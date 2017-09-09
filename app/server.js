var CronJob = require('cron').CronJob;
var axios = require('axios');
var mongoose = require('mongoose');
var ApiEvents = require('./models/ApiEvents');
var stateInitials = require('./cron-helper/states');
var moment = require('moment');
var Politician = require('./models/Politician');

//Set mongoose to use promises
mongoose.Promise = Promise;
//for api calls later
var eventsBaseURL = 'http://politicalpartytime.org/api/v1';

//db name = whosyourrep
mongoose.connect('mongodb://localhost/whosyourrep');
var db = mongoose.connection;

db.on('error', function(error) {
	console.log('Mongoose error: ', error);
});

db.once('open', function() {
	console.log('Mongoose connection successful');
});

//Get all political events for poltiicians for all states
//run at noon
new CronJob('00 00 12 * * *', function() {
	var count = 0;
	var errcount=0;
	console.log('running');
	// every half hour, lets query for the state events
	stateInitials.forEach(function(state, index) {
		//create query
		var queryURL = eventsBaseURL + '/event/?beneficiaries__state=' + state + '&format=json';
		var stateinitial = state;
		axios({
		  	method:'GET',
		  	url:queryURL,
	   		headers: {'X-Requested-With': 'XMLHttpRequest'},
		    responseType: 'json'
		})
		.then((response) => {
			//Get handle to actual data
			var results = response.data.objects
			//store in db
			var apiEvent = {};
			results.forEach(function(event, index) {
				var beneficiaries = [];
				event.beneficiaries.forEach(function(beneficiary, index){
					beneficiaries.push(beneficiary.name);
				});

				apiEvent.beneficiaries = beneficiaries;

				apiEvent.state = stateinitial;
				apiEvent.title = event.entertainment;
				apiEvent.start = event.end_date ? new Date(event.start_date + ' 00:00:00') : new Date(event.start_date + ' 00:00:00');
				apiEvent.end = event.end_date ? new Date(event.end_date + '23:59:59') : new Date(event.start_date + ' 23:59:59');
				apiEvent.desc = event.make_checks_payable_to;
				apiEvent.location = event.venue.address1 + ', ' + event.venue.state + ', ' + event.venue.city;

				var newEvent = new ApiEvents(apiEvent);

				newEvent.save(function(err, doc) {
					if(err) {
						errcount++;
					} else {
						count++;
					}
				});
			});

			console.log('Saved ' + count + ' api events');
			console.log('Error on ' + errcount + ' events');
		});

	});

	}, null, true, 'America/Los_Angeles');

//getting all politicians
var opensecetsAPIKey = 'ae20f4a9d0bfa0a12552aa9c592440cb';

var repsAdded = 0;
var sensAdded = 0;
var cids = [];

//Scrape and store initial poltiicans from open secrets
// stateInitials.forEach(function(state, index) {
// 	var queryURL = 'http://www.opensecrets.org/api/?method=getLegislators&id=' + state + '&apikey=' + opensecetsAPIKey + '&output=json';

// 	var polsCID = [];
// 	var polsDonors = [];

// 	axios({
// 	  	method:'GET',
// 	  	url: queryURL,
// 	    responseType: 'json'
// 	}).then((resp) => {
// 		var totalLegislators = resp.data.response.legislator.length;
// 		var legislator = resp.data.response.legislator;
// 		var reps = [];
// 		var sens = [];
// 		//Only representatives
// 		for(var i = 0; i < totalLegislators-2; i++) {
// 			reps.push(legislator[i]['@attributes']);
// 			// console.log('reps', reps);
// 		}


// 		//For senators
// 		for(var i = totalLegislators-2; i < totalLegislators; i++) {
// 			sens.push(legislator[i]['@attributes']);
// 		}

// 		reps.forEach(function(rep, index) {
// 			console.log(rep);
// 			console.log('running reps');
// 			var politician = {};
// 			politician.cid = rep.cid;
// 			politician.position = 'Representative';
// 			politician.name = rep.firstlast;
// 			politician.party = rep.party;
// 			politician.twitterHandle = rep.twitter_id;
// 			politician.proPublicaId = rep.bioguide_id;
// 			cids.push(politician.cid);
// 			var newPolitician = new Politician(politician);
			
// 			newPolitician.save(function(err, doc) {
// 				if(err) {
// 					console.log('err ', err);
// 				} else {

// 				}
// 			});
// 		});
		
// 		sens.forEach(function(sen, index) {
// 			console.log('running reps');
// 			var politician = {};
// 			politician.cid = sen.cid;
// 			politician.position = 'Senator';
// 			politician.name = sen.firstlast;
// 			politician.party = sen.party;
// 			politician.twitterHandle = sen.twitter_id;
// 			politician.proPublicaId = sen.bioguide_id;

// 			cids.push(politician.cid);

// 			var newPolitician = new Politician(politician);
// 			newPolitician.save(function(err, doc) {
// 				if(err) {
// 					console.log('err ', err);
// 				} else {

// 				}
// 			});
// 		});
// 	});
// });

// // populating reelction, bills 
// Politician.find({})
// 	.exec(function(err, dbresults) {
// 		dbresults.forEach(function(results, index) {
			//results.proPublicaId instaed of N00003522
			var baseQuery = "https://api.propublica.org/congress/v1/members/" + 'K000388' + ".json";
			axios({
				url: baseQuery,
				method: "GET",
				dataType: 'json',
				headers: {'X-API-Key': '45Jqi2YUkG5u36euvspZI9yLR0dAOrz545XRSwW1'}
			}).then((resp)=>{
				var termEnds = resp.data.results[0].roles[0].end_date;

				resp.data.results[0].roles[0].committees.forEach(function(item, index) {
					var committeeNames = [];
					committeeNames.push(item.name);
				});

				Politician.findOneAndUpdate({
					proPublicaId: results.proPublicaId
				}, {
					endOfTerm: termEnds,
					roles: committeeNames
				}).exec(function(err, doc) {
					if(err) {
						console.log('err', err);
					} else {
						console.log('updated term and roles');
					}
				});
			
			});

			// });
// 	});
// });