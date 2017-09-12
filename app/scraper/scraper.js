var CronJob = require('cron').CronJob;
var ApiEvents = require('../models/ApiEvents');
var Politician = require('../models/Politician');
var mongoose = require('mongoose');
var stateInitials = require('./cron-helper/states');
var axios = require('axios');
//Jaylesh
// var opensecretsAPIKey = 'ae20f4a9d0bfa0a12552aa9c592440cb';
//Brian
var opensecretsAPIKey = '0e11c0ea5a983dc2004af32bd38156c1';
//Rebecca
//var opensecretsAPIKey = '3da199dd81facd0573805a2e099abd45';
//additional key
//var opensecretsAPIKey = 'f6c7bd41f17ff86b93da41debbc29a2b';


function calendarEventsScraper() {
	//for api calls later
	var eventsBaseURL = 'http://politicalpartytime.org/api/v1';
	var count = 0;
	var errcount=0;

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
}

//This doesn't run right now due to api limit
function donorsPoliticianScraper() {
	console.log('INSIDE DONORS');
	//instead of N000..., results.propbulica
	Politician.find({})
	.exec(function(err, dbresponse) {
		
		dbresponse.forEach(function(item, index) {
			//must use CID here
			var queryURL = 'http://www.opensecrets.org/api/?method=candIndustry&cid='+item.cid+'&cycle=2016&apikey='+opensecretsAPIKey+'&output=json';
			//for each representative, reps.ForEach() here
			axios({
				url: queryURL,
				method: 'GET',
				dataType: 'json'
			}).then((resp)=>{

				var donors = [];
				resp.data.response.industries.industry.forEach(function(item, index) {
					var donor = {};
					donor.industry = item['@attributes'].industry_name;
					donor.total = item['@attributes'].total;
					donors.push(donor);
				});

				//save into db of correct politician
				Politician.findOneAndUpdate({
					cid: item.cid
				},{
					donors: donors
				}
				).exec(function(err, doc) {
					if(err) {
						console.log(err);
					} else {
						console.log('updated donors, ', doc);
					}
				});
			});
		});
	});
}

function rolesPoliticianScraper() {
	console.log('inside roles scraper');
	// populating reelction, roles
	Politician.find({
	})
	.exec(function(err, dbresults) {
		console.log('dbr', dbresults);
		dbresults.forEach(function(results, index) {
			// console.log('dbresults', dbresults);
			// results.proPublicaId instaed of N00003522
			var baseQuery = "https://api.propublica.org/congress/v1/members/" + results.proPublicaId + ".json";
			
			axios({
				url: baseQuery,
				method: "GET",
				dataType: 'json',
				headers: {'X-API-Key': '45Jqi2YUkG5u36euvspZI9yLR0dAOrz545XRSwW1'}
			}).then((resp)=>{
				// console.log('response: ', resp);
				var termEnds = resp.data.results[0].roles[0].end_date;
				var committeeNames = [];

				resp.data.results[0].roles[0].committees.forEach(function(item, index) {
					committeeNames.push(item.name);
				});

				Politician.findOneAndUpdate({
					proPublicaId: results.proPublicaId
				}, {
					endOfTerm: termEnds,
					roles: committeeNames
				}).exec(function(err, doc) {
					if(err) {
						console.log('err');
					} else {
						console.log('updated term and roles');
					}
				})


			});

			if(index == dbresults.length-1) {
				//run next scraper function
				console.log('RUNNING DONORS');
				// donorsPoliticianScraper();
			}

		});

	});
}

function initialPoliticianScraper() {
	// getting all politicians
	var repsAdded = 0;
	var sensAdded = 0;

	//Scrape and store initial poltiicans from open secrets
	stateInitials.forEach(function(state, index) {
		var queryURL = 'http://www.opensecrets.org/api/?method=getLegislators&id=' + state + '&apikey=' + opensecretsAPIKey + '&output=json';

		var polsCID = [];
		var polsDonors = [];

		axios({
		  	method:'GET',
		  	url: queryURL,
		    responseType: 'json'
		}).then((resp) => {
			var totalLegislators = resp.data.response.legislator.length;
			var legislator = resp.data.response.legislator;
			var reps = [];
			var sens = [];
			//Only representatives
			for(var i = 0; i < totalLegislators-2; i++) {
				reps.push(legislator[i]['@attributes']);
				// console.log('reps', reps);
			}


			//For senators
			for(var i = totalLegislators-2; i < totalLegislators; i++) {
				sens.push(legislator[i]['@attributes']);
			}

			reps.forEach(function(rep, index) {
				//for each rep in the state, make rep object and save to db
				var politician = {};
				politician.state = state;
				politician.cid = rep.cid;
				politician.position = 'Representative';
				politician.name = rep.firstlast;
				politician.party = rep.party;
				politician.twitterHandle = rep.twitter_id;
				politician.proPublicaId = rep.bioguide_id;
				var newPolitician = new Politician(politician);
				
				newPolitician.save(function(err, doc) {
					if(err) {
						// console.log('err ', err);
					} else {

					}
				});
			});
			
			sens.forEach(function(sen, index) {
				//for each senator in state, make object and store in db
				var politician = {};
				politician.state = state;
				politician.cid = sen.cid;
				politician.position = 'Senator';
				politician.name = sen.firstlast;
				politician.party = sen.party;
				politician.twitterHandle = sen.twitter_id;
				politician.proPublicaId = sen.bioguide_id;


				var newPolitician = new Politician(politician);
				newPolitician.save(function(err, doc) {
					if(err) {
						// console.log('err');
					} else {
						// console.log('success');
					}
				});
			});

			if(index == stateInitials.length-1){
				console.log('index', index);
				console.log(stateInitials.length);
				console.log('about to run roles scraper');
				rolesPoliticianScraper();			
			}
		});
	});

};

module.exports = function() {

	//Get all political events for poltiicians for all states
	//check if database is empty, if so, run, otherwise, only run at noon
	ApiEvents.find({})
	.exec(function(err, response) {
		if(response.length === 0) {
			console.log('running initial scrape');
			//do initial scrape
			calendarEventsScraper();
		} else {
			//scrape everyafternoon
			console.log('going to run event scraper at noon');
			new CronJob('00 00 12 * * *', function() {
				calendarEventsScraper();
			}, null, true, 'America/Los_Angeles');
		}
	});

	// Checking initial 
	Politician.find({})
	.exec(function(err, response) {
		if (response.length === 0) {
			console.log('running scrape of politicians');
			initialPoliticianScraper();
		}
	});

	// donorsPoliticianScraper();
};