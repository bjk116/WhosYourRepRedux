import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/Navbar/navBar";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Calendar from "./components/Main/calendar/Calendar";
import PieChart from "./components/Main/chart/chart";
import Politician from "./components/Main/politician/Politician";
import SearchBar from "./components/Main/searchBar/searchBar";
import StatePage from "./components/Main/state/StatePage";

import Form from "./components/Main/Form/Form";
import Trending from "./components/Main/Trending/Trending";
import {Switch, Route} from "react-router-dom";
import UpdatedNavBar from './components/Navbar/UpdatedNavBar';

// <Calendar searchBy={"state"} searchCriteria={"NJ"}/>
class CalendarWrapper extends Component{
  render() {
    return(
        <Calendar searchBy={"state"} searchCriteria={"NJ"}/>
    );
  }
}

class StatePageWrapper extends Component {
  render() {
    return(
      <StatePage stateID={'NJ'} />
    );
  }
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      currentComponent : "/state",
      loggedInStatus : false,
    }
  }

  render() {
    return (
      <div id="App">
        <UpdatedNavBar />
        <SearchBar />

        <Form />

        <Switch>
            <Route exact path='/calendar' component = {CalendarWrapper} />
            <Route exact path = '/state' component = {StatePageWrapper} />      
        </Switch>

        <Footer />
      </div>
    );
  }
}



export default App;


