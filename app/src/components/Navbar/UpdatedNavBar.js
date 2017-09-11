import React from 'react';
import {Link} from 'react-router-dom';

class UpdatedNavBar extends React.Component {
	render() {
		return(
			<nav>
				<div className="nav-wrapper">
					<ul id = "navbar-left" className="left">
						<li className="active"><Link to="/">Logo Image</Link></li>
						<li className="active"><Link to="/">RepGenius</Link></li>
					</ul>
					<ul id = "navbar-right" className="right">
						<li className = "active"><Link to="/calendar">Calendar</Link></li>
						<li className="active"><a href="/auth/facebook">Login with Facebook</a></li>
					</ul>
				</div>
			</nav>

		);
	}
}

export default UpdatedNavBar;