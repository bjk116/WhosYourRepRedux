import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ApiTrending from './ApiTrending/ApiTrending';
import UserTrending from './UserTrending/UserTrending';

var margin = {
	marginLeft: 40,
	marginRight: 40
}

//remember to add back UserTrending
class Trending extends Component {
	render() {
		return(
			<MuiThemeProvider style={margin}>
				<ApiTrending />
			</MuiThemeProvider>
		);
	}
}

export default Trending;