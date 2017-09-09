import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Calendar from "./components/Main/Calendar/Calendar";
import PieChart from "./components/Main/Chart/Chart";
import Politician from "./components/Main/Politician/Politician";
import SearchBar from "./components/Main/SearchBar/SearchBar";
import StatePage from "./components/Main/State/StatePage";
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