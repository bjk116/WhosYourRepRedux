import React from 'react';
import {Link} from 'react-router-dom';


class UpdatedNavBar extends React.Component {
	render() {
		return(
			<nav>
				<div className="nav-wrapper">
					<ul id="nav-mobile" className="left hide-on-med-and-down" className="left" >
						<li><img src="logo2.png" id="logo-img" /></li>
						<li className="active"><Link to="/">RepGenius</Link></li>
						<li id="nav-title" className="title">Who's Your Rep?</li>
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

/*
   <nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo">Logo</a>""
      <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
      <li class="active"><a href="index.html" class="brand-logo left"><img src="logo.png"/></a></li>
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">Javascript</a></li>
        <li><a href="mobile.html">Mobile</a></li>
      </ul>
      <ul class="side-nav" id="mobile-demo">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">Javascript</a></li>
        <li><a href="mobile.html">Mobile</a></li>
      </ul>
    </div>
  </nav>
*/



