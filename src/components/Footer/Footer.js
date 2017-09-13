import React, {Component} from 'react';
import Style from "./style.css";

class Footer extends React.Component {
  render(){
    return (
    	<div className = "container-fluid foot">
        	<footer className="footer">
  				  <p>&copy; 2017</p>
  				  <p>Jay Patel, Brian Karabinchak, Winston Lum, Rebecca Renavitz</p>
			    </footer>
      </div>
    );
  }
};

export default Footer;

