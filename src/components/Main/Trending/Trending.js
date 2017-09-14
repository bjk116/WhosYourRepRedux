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
			<div className="row">
				<div className="col m6 offset-m3" style={{height:500, overflow:'auto'}}>
					<MuiThemeProvider style={margin}>
						<ApiTrending />
					</MuiThemeProvider>
				</div>
			</div>
		);
	}
}

export default Trending;