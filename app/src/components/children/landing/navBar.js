import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

class Login extends Component {
  static muiName = "FlatButton";

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

const Logged = (props) => (
	//What buttons look like
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    //Position of prop
    targetOrigin={{horizontal: "right", vertical: "top"}}
    anchorOrigin={{horizontal: "right", vertical: "top"}}
    //Hidden until pressed
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem onClick={this.handleChange} primaryText="Sign out" />
    
  </IconMenu>
);

Logged.muiName = "IconMenu";

class NavBar extends Component {
	//find way to hide or trigger state change
  state = {
    logged: false,
  };

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Toggle
            label="Logged"
            defaultToggled={false}
            onToggle={this.handleChange}
            labelPosition="right"
            style={{margin: 20}}
          />
          <AppBar
            title="Title"
            iconElementRight={this.state.logged ? <Logged /> : <Login />}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default NavBar;

// import React, {Component} from "react";
// import ReactDOM from "react-dom";

// const NavComponent = React.createClass({
//   toggle: function() {
//     let linksEl = document.querySelector(".links");

//     if (linksEl.style.display === 'block') {
//       linksEl.style.display = 'none';
//     } 
//     else {
//       linksEl.style.display = 'block';
//     }
//   }

//   render: function() {
//     return (
//       <nav>
//         <div className="nav">
//           <i className="fa fa-bars fa-2x"></i>
//           <div className="links">
//             <li><Link to="/home">Home</Link></li>
//             <a href="#">Link 2</a>
//             <a href="#">Link 3</a>
//           </div>
//         </div>
//       </nav>
//     );
//   }
// });

// export default NavBar;