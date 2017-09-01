import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import '../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends Component {
	render(){
		return(
			<div>
    			<BigCalendar
		            popup
		            selectable
		            events={[]}
		            // eventPropGetter={this.eventColor}
		            // onSelectEvent={event => console.log(event.title)}
		            // views={['month', 'week', 'day']}
    			/>
  			</div>
		);
	}
}

export default Calendar;