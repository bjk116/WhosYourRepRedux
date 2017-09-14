import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import polToCID from '../../../utils/polToCID';
import CIDtoTwitter from '../../../utils/CIDtoTwitter';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

//in here, we just call exact materialui componnent, no need for muithemeprovider
class ApiTrending extends Component {
	componentDidMount() {
		//api call here for events, then make tiledate
		//axios call to our own api
		console.log('running trending call');
		var tempArr=[];
		axios({
			url: '/trending',
			method: 'GET',
			dataType: 'json'
		}).then((resp)=>{
			console.log('resp', resp.data);
			resp.data.forEach(function(apiEvent) {

				var event = {};
				var name = apiEvent.beneficiaries[0];
				var CID = polToCID[name];
				var twitterHandle = CIDtoTwitter[CID];
				console.log(twitterHandle);
				event.primaryText = apiEvent.title;
				event.beneficiary = apiEvent.beneficiaries[0];
				event.twitterPicture = "https://twitter.com/" + twitterHandle +"/profile_image?size=original";
				event.description = apiEvent.desc;
				event.start = apiEvent.start;
				event.link = '/politician/'+CID;
				tempArr.push(event);
			});

			this.setState({
				listOfEvents: tempArr
			});
		});
		
	}

	constructor(props) {
		super(props);
		this.state = {
			listOfEvents : [] 
		};
	}

	render() {
		return(
			<div>
		      <List>
		        <Subheader>Upcoming Political Events!</Subheader>
		        {this.state.listOfEvents.map(Events=>(
		        	<div>
			        	<ListItem
			        	style={{marginBottom: 8}}
			          	leftAvatar={<Avatar src={Events.twitterPicture} />}
			          	primaryText={Events.primaryText}
			          	disabled={true}
			          	secondaryText={
			          		<div>
				           	 	<p>
				            	  <span style={{color: darkBlack}}><a href={Events.link}>{Events.beneficiary}</a></span>
				            	  {Events.description.length>0 &&
				            	  	<div>
				            	  		{Events.description}
				            	  	</div>
				            	  }<div>
				            	  	<span style={{color: darkBlack}}>Start: </span>
				            	  	{Events.start}
				            	  </div>
				            	</p>
			            	</div>
			          	}
			          	secondaryTextLines={2}
			        	/>
			        	<Divider inset={true} />
			        </div>
              	))}
		        
		      </List>
  		    </div>
		);
	}
}

export default ApiTrending;

//For twitter pic
//"https://twitter.com/' + twitterHandle +'/profile_image?size=original"