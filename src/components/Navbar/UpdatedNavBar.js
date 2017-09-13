import React from 'react';
import {Link} from 'react-router-dom';
import "./style.css";

class UpdatedNavBar extends React.Component {
	render() {
		return(
			<nav>
				<div className="nav-wrapper">
					<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
					<ul id="nav-mobile" className="hide-on-small-only" className="left" >
						<li><img src="logo2.png" id="logo-img" className="hide-on-small-only"/></li>
						<li className="active" className ="hide-on-small-only"><Link to="/">RepGenius</Link></li>
						<li id="nav-title">Who's Your Rep?</li>
					</ul>

					<ul id="nav-mobile" className="hide-on-small-only" className="right">
						<li className ="active" className ="hide-on-small-only"><Link to="/calendar">Calendar</Link></li>
						<li className ="active" className ="hide-on-small-only"><Link to="/state">State</Link></li>
						<li className="active" className ="hide-on-small-only"><a href="/auth/facebook">Login with Facebook</a></li>
					{/*<li className="active"><a href="http://localhost:3000/logout">Logout</a></li>*/}
					</ul>
				</div>
			</nav>


		);
	}
}


export default UpdatedNavBar;
