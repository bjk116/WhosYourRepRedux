import React from "react";
import ReactDOM from "react-dom";

const NavBar = React.createClass({
  render: function() {
    return (
      <nav class="navbar navbar-default">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="#">Who's Your Rep?</a>
			    </div>

			    <ul class="nav navbar-nav">
			      <li class="active"><a href="#">Home</a></li>
			      <li><a href="#">Page 1</a></li>
			      <li><a href="#">Login</a></li>
			    </ul>
			  </div>
			</nav>
    );
  }
});

ReactDOM.render(<NavBar />, document.querySelector("navbar"));