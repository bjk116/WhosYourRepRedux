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
		
	}

	render() {
		return(
			<div>
		      <List>
		        <Subheader>Today</Subheader>
		        <ListItem
		          leftAvatar={<Avatar src="images/ok-128.jpg" />}
		          primaryText="Brunch this weekend?"
		          secondaryText={
		            <p>
		              <span style={{color: darkBlack}}>Brendan Lim</span> --
		              I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
		            </p>
		          }
		          secondaryTextLines={2}
		        />
		        <Divider inset={true} />
		        
		      </List>
  		    </div>
		);
	}
}

export default ApiTrending;

//For twitter pic
//"https://twitter.com/' + twitterHandle +'/profile_image?size=original"