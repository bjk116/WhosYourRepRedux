import React from 'react';
import {Link} from 'react-router-dom';
import "./style.css";

class UpdatedNavBar extends React.Component {
	render() {
		return(
			<nav>
				<div className="nav-wrapper">
					<ul id="nav-mobile" className="left hide-on-med-and-down" className="left" >
						<li><img src="logo2.png" id="logo-img" /></li>
						<li className="active"><Link to="/">RepGenius</Link></li>
						<li id="nav-title">Who's Your Rep?</li>
					</ul>
					<ul id="nav-mobile" className="right hide-on-med-and-down" className="right">
						<li className ="active"><Link to="/calendar">Calendar</Link></li>
						<li className ="active"><Link to="/state">State</Link></li>
						<li className="active"><a href="http://localhost:3000/auth/facebook">Login with Facebook</a></li>
					{/*<li className="active"><a href="http://localhost:3000/logout">Logout</a></li>*/}
					</ul>
				</div>
			</nav>
		);
	}
}

export default UpdatedNavBar;