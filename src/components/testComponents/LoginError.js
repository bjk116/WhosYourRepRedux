import React from 'react';
import {Link} from 'react-router-dom';


class LoginError extends React.Component {
	render() {
		return(

		      	<div className="row" id ="loginerrorcard">
			        <div className="col s6 m6 center-align">
			          <div className="card grey darken-1 hoverable">
			            <div className="card-content black-text">
			              <p><img src="http://i0.kym-cdn.com/photos/images/original/000/918/810/a22.jpg" width = "400" height="250"></img></p>
			              <br></br>
			              <span className="card-title">Login failed</span>
			            </div>
			            <div className="card-action">
			              <Link to="/">Go back and try again</Link>
			            </div>
			          </div>
			        </div>
			    </div>

		);
	}
}

export default LoginError;