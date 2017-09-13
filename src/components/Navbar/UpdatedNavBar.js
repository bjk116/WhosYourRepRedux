import React from 'react';
import {Link} from 'react-router-dom';
import "./style.css";

class UpdatedNavBar extends React.Component {
	constructor(props){
		super(props);
		//going to use props as the second part of the ahref link, ie 
		//<a href={"/state/" + this.prop.stateParam}>State</a>
	}
	
	render() {
		return(
			<nav>
				<div className="nav-wrapper">
					<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
					<ul id="nav-mobile" className="hide-on-small-only" className="left" >
						<li><img src="logo2.png" id="logo-img" className="hide-on-small-only"/></li>
						<li className="active" className ="hide-on-small-only">RepGenius</li>
						<li id="nav-title" class="hide-on-small-only">Who's Your Rep?</li>
					</ul>

					<ul id="nav-mobile" className="hide-on-small-only" className="right">
						<li className ="active" className ="hide-on-small-only">Calendar</li>
						<li className ="active" className ="hide-on-small-only">State</li>
						<li className="active" className ="hide-on-small-only"><a href="/auth/facebook">Login with Facebook</a></li>
					{/*<li className="active"><a href="http://localhost:3000/logout">Logout</a></li>*/}
					</ul>
				</div>
			</nav>


		);
	}
}


export default UpdatedNavBar;
