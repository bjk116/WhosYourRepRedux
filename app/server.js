var CronJob = require('cron').CronJob;
var axios = require('axios');
var mongoose = require('mongoose');
var stateInitials = require('./cron-helper/states');
//Set mongoose to use promises
mongoose.Promise = Promise;
//for api calls later
var eventsBaseURL = 'http://politicalpartytime.org/api/v1';


mongoose.connect('mongodb://localhost/whosreppingyou');
var db = mongoose.connection;

db.on('error', function(error) {
	console.log('Mongoose error: ', error);
});

db.once('open', function() {
	console.log('Mongoose connection successful');
});

//Get all political events for poltiicians for all states
new CronJob('* 19 * * * *', function() {
	console.log('running');
	// every half hour, lets query for the state events
	stateInitials.forEach(function(state, index) {
		//create query
		var queryURL = eventsBaseURL + '/event/?beneficiaries__state=' + state + '&format=json';

		axios({
		  	method:'GET',
		  	url:queryURL,
	   		headers: {'X-Requested-With': 'XMLHttpRequest'},
		    responseType: 'json'
		})
		.then((response) => {
			console.log(response);

			//Using sample data for the time bieng
			// response.data.objects.forEach(function(item, index) {
			// 	events.push({
			// 		title: item.make_checks_payable_to ? item.entertainment + ': ' + item.make_checks_payable_to : item.entertainment + ' For: ' + item.beneficiaries[0].name,
			// 		start: item.end_date ? new Date(item.start_date + ' 00:00:00') : new Date(item.start_date + ' 00:00:00'),
			// 		end: item.end_date ? new Date(item.end_date + '23:59:59') : new Date(item.start_date + ' 23:59:59'),
			// 		desc: item.hosts[0] ? item.hosts[0] : item.other_members[0]
			// 	});					
			// });
		});

	});
	}, null, true, 'America/Los_Angeles');