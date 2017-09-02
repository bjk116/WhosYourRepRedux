import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import './react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import results from './sampleData'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends Component {
	getEventsByCriteria(searchBy, searchFor) {
		var baseURL = 'http://politicalpartytime.org/api/v1';

		switch(searchBy) {
			case 'state':
				// var queryURL = baseURL + '/event/?beneficiaries__state=' + searchFor+ '&format=json';

				// axios({
				//   	method:'GET',
				//   	url:queryURL,
		  //   		headers: {'X-Requested-With': 'XMLHttpRequest'},
				//     responseType: 'json',
				//     withCredentials: true,
				// })
				//   .then(function(response) {
				//   console.log(response);
				// });
				var events = [];

				//Using sample data for the time bieng
				results.objects.forEach(function(item, index) {
					console.log(item);
					events.push({
						title: item.make_checks_payable_to ? item.entertainment + ': ' + item.make_checks_payable_to : item.entertainment + ' For: ' + item.beneficiaries[0].name,
						start: item.end_date ? new Date(item.start_date + ' 00:00:00') : new Date(item.start_date + ' 00:00:00'),
						end: item.end_date ? new Date(item.end_date + '23:59:59') : new Date(item.start_date + ' 23:59:59'),
						desc: item.hosts[0] ? item.hosts[0] : item.other_members[0]
					});					
				});

				console.log('events', events);
				return events;

				break;
			case 'politician':

				break;
			default:
				throw 'You need to searchBy state or politician';
				break;
		}
	}

	constructor(props) {
		super(props);
	}


	render(){
		var eventList = this.props.eventList;
		return(
			<div className="container-fluid">
    			<BigCalendar
		            events={this.getEventsByCriteria(this.props.searchBy, this.props.searchCriteria)}
		            eventPropGetter={this.eventColor}
		            /*
						Try to get this onSelectEvent to create a modal of event details!
		            */
		            onSelectEvent={event => console.log(event.title)}
		            views={['month', 'week', 'day']}
    			/>
  			</div>
		);
	}
}

export default Calendar;