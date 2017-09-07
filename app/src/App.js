import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/children/Header';
import Footer from './components/children/Footer';
import Main from './components/Main';
import Calendar from './components/children/calendar/Calendar';
import PieChart from './components/children/chart/chart';
import NavBar from './components/children/landing/NavBar';
import SearchBar from './components/children/landing/SearchBar';

class App extends Component {
  render() {
    return (
      <div id="App">
        <NavBar />
        <SearchBar />
        <PieChart/>
        <Footer />
      </div>
    );
  }
}

export default App;
