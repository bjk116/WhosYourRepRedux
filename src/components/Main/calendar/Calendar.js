import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import './react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import results from './sampleData';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends Component {
	getEventsByCriteria(searchBy) {
		axios({
			url: '/events/'+searchBy,
			method: 'GET',
			dataType:'json',
		}).then((response)=>{
			console.log(response);
			var events = response.data;

			this.setState({
				returnedEvents: events
			});		
		});
	}

	constructor(props) {
		console.log('constructing calendar');
		super(props);
		this.state = {
			returnedEvents: [],
			open: false,
			title: '',
			startTime: '',
			description: '',
			beneficiaries: []
		}

		this.getEventsByCriteria = this.getEventsByCriteria.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	
	handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

	componentDidMount() {
		console.log('running mount with props', this.props);
		var searchBy = this.props.searchBy;
		this.getEventsByCriteria(this.props.searchCriteria);
	}

	popUp(event) {
		console.log(event);
		var date = new Date(event.start);
		var time = date.getUTCHours()+ ':00';
		this.setState({
			title: event.title,
			startTime: time,
			description: event.desc,
			beneficiaries: event.beneficiaries
		});

		this.handleOpen();
	}

	render(){
	    const actions = [
    		<FlatButton
        		label="Done"
        		primary={true}
		        keyboardFocused={true}
        		onClick={this.handleClose}
      			/>
      	];
		return(
			<div className="container-fluid">
    			<BigCalendar
		            events={this.state.returnedEvents}
		            eventPropGetter={this.eventColor}
		            /*
						Try to get this onSelectEvent to create a modal of event details!
		            */
		            selectable
		            onSelectEvent={event => this.popUp(event)}
		            views={['month', 'week', 'day']}
    			/>
    			<MuiThemeProvider>
	                <Dialog
	                    title={this.state.title}
	                    actions={actions}
	                    modal={false}
	                    open={this.state.open}
	                    onRequestClose={this.handleClose}
	                    >
	                    <h5>At: {this.state.startTime}</h5>
	                    <h5>For: {this.state.beneficiaries[0]}</h5>
	                    {this.state.description &&
	                    	<h5>Description: {this.state.description}</h5>}
	                </Dialog>
                </MuiThemeProvider>
  			</div>
		);
	}
}

export default Calendar;