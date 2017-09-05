import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/children/Header';
import Footer from './components/children/Footer';
import Main from './components/Main';
import Calendar from './components/children/calendar/Calendar';
import NavBar from './components/children/landing/navBar';
import SearchBar from './components/children/landing/searchBar';

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
