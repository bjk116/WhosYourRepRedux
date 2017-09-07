import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import Toggle from "material-ui/Toggle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchBar from "./SearchBar";

class Login extends Component {
  static muiName = "FlatButton";

  render() {
    return (
      <RaisedButton {...this.props} label="Login" />
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
          <AppBar
            title={<SearchBar />}
            iconElementRight={this.state.logged ? <Logged /> : <Login />}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default NavBar;