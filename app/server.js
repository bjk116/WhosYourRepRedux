var CronJob = require('cron').CronJob;
var axios = require('axios');
var mongoose = require('mongoose');
var ApiEvents = require('./models/ApiEvents');
var stateInitials = require('./cron-helper/states');
var moment = require('moment');
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

//getting all events