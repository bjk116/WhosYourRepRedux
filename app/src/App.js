import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Calendar from "./components/Main/Calendar/Calendar";
import PieChart from "./components/Main/chart/Chart";
import Politician from "./components/Main/politician/Politician";
import SearchBar from "./components/Main/searchBar/SearchBar";
import StatePage from "./components/Main/state/StatePage";
import Trending from "./components/Main/Trending/Trending"

// <Calendar searchBy={"state"} searchCriteria={"NJ"}/>
class App extends Component {
  render() {
    return (
      <div id="App">
        <NavBar />
        <SearchBar />
        <Calendar searchBy={'state'} searchCriteria={'NJ'}/>
        <Footer />
      </div>
    );
  }
}

export default App;

//open /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir