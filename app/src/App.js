import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/children/Header';
import Footer from './components/children/Footer';
import Main from './components/Main';
import Calendar from './components/children/calendar/Calendar';
<<<<<<< HEAD
import PieChart from './components/children/chart/chart';
=======
import PieChart from './components/children/chart/Chart';
import Politician from './components/children/politician/Politician';
>>>>>>> 630d93a1af5c5d22c9c1af2daa8dcb7c59262691
import NavBar from './components/children/landing/navBar';
import SearchBar from './components/children/landing/searchBar';
import StatePage from './components/children/state/StatePage';


class App extends Component {
  render() {
    return (
      <div id="App">
        <Header />
        <NavBar />
        <SearchBar />
        <Calendar searchBy={'state'} searchCriteria={'NJ'}/>
        <Footer />
      </div>
    );
  }
}

export default App;
