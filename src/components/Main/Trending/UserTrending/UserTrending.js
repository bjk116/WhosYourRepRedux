import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GridList from 'material-ui/GridList';

//in here, we just call exact materialui componnent, no need for muithemeprovider
class UserTrending extends Component {
	render() {
		return(
			<GridList />
		);
	}
}

export default UserTrending;