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
import Form from "./components/testComponents/Form";

// <Calendar searchBy={"state"} searchCriteria={"NJ"}/>
class App extends Component {
  render() {
    return (
      <div id="App">
        <NavBar />
        <SearchBar />
        <Form />
        <Footer />
      </div>
    );
  }
}


export default App;