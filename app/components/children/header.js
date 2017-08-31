// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var Header = React.createClass({
  render: function() {
    return (
    	<div class = "container-fluid">
        	<div class = "row">
            	<div class="text-center">
                	<h1 id = "header-text">Who's Your Rep??</h1>
                </div>
            </div>
        </div>
    );
  }
});

module.exports = Header;