import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/children/Header";
import Footer from "./components/children/Footer";
import Main from "./components/Main";
import Calendar from "./components/children/calendar/Calendar";
import PieChart from "./components/children/chart/Chart";
import Politician from "./components/children/politician/Politician";
import NavBar from "./components/children/landing/NavBar";
import SearchBar from "./components/children/landing/SearchBar";
import StatePage from "./components/children/state/StatePage";

// <Calendar searchBy={"state"} searchCriteria={"NJ"}/>
class App extends Component {
  render() {
    return (
      <div id="App">
        <Header />
        <NavBar />
        <SearchBar />
        <StatePage />
        <Footer />
      </div>
    );
  }
}

export default App;
