import React from 'react';
import {Link} from 'react-router-dom';

class UpdatedNavBar extends React.Component {
	render() {
		return(
			<nav>
				<div className="nav-wrapper">
					<ul id = "navbar-left" className="left">
						<li className="active"><a href="/test">Logo Image</a></li>
						<li className="active"><Link to="/">RepGenius</Link></li>
					</ul>
					<ul id = "navbar-right" className="right">
						<li className = "active"><Link to="/calendar">Calendar</Link></li>
						<li className="active"><a href="localhost:8080/auth/facebook">Login with Facebook</a></li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default UpdatedNavBar;