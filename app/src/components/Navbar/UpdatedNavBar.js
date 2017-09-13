import React from 'react';
import {Link} from 'react-router-dom';


class UpdatedNavBar extends React.Component {
	render() {
		return(
			<nav>
				<div className="nav-wrapper">

					<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
					<ul id="nav-mobile" className="hide-on-small-only" className="left" >
						<li className ="hide-on-small-only"><Link to="logo2.png"><a id="img-link" href="index.html"><img src="logo2.png" id="logo-img"/></a></Link></li>
						<li className="active" className ="hide-on-small-only"><Link to="/">RepGenius</Link></li>
						
					<ul className="left" id="nav-title-class">
						<li id="nav-title">Who's Your Rep?</li>
					</ul>

					<ul id="nav-mobile" className="hide-on-small-only" className="right">
						<li className ="active" className ="hide-on-small-only"><Link to="/calendar">Calendar</Link></li>
						<li className ="active" className ="hide-on-small-only"><Link to="/state">State</Link></li>
						<li className="active" className ="hide-on-small-only"><a href="http://localhost:3000/auth/facebook">Login with Facebook</a></li>
					{/*<li className="active"><a href="http://localhost:3000/logout">Logout</a></li>*/}
					</ul>
				</div>
			</nav>
		);
	}
}



export default UpdatedNavBar;




