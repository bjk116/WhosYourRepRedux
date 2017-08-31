// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var Footer = React.createClass({
  render: function() {
    return (
    	<div class = "container-fluid">
        	<footer class="footer">
  				<p>&copy; 2017</p>
  				<p>Jay Patel, Brian Karabinchak, Winston Lum, Rebecca Renavitz</p>
			</footer>
        </div>
    );
  }
});

module.exports = Footer;

