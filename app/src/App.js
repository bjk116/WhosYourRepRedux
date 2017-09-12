import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/Navbar/navBar";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Calendar from "./components/Main/calendar/Calendar";
import PieChart from "./components/Main/chart/chart";
import Politician from "./components/Main/politician/Politician";
import StatePage from "./components/Main/state/StatePage";

import Form from "./components/Main/Form/Form";
import Trending from "./components/Main/Trending/Trending";
import {Switch, Route} from "react-router-dom";
import UpdatedNavBar from './components/Navbar/UpdatedNavBar';
import LoginError from './components/testComponents/LoginError';

//Searchbar stuff
import AutoComplete from "material-ui/AutoComplete";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Source from "./components/Main/searchBar/dataSource";
import Style from "./components/Main/searchBar/style.css";
import JSONP from "jsonp";
import Autosuggest from "react-autosuggest";

//SearchBar Functions
var AutosuggestHighlightMatch = require("autosuggest-highlight/match");
var AutosuggestHighlightParse = require("autosuggest-highlight/parse");
var style = Style;
var data = Source;

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("\\b" + escapedValue, "i");
  
  return data.filter(item => regex.test(getSuggestionValue(item)));
}

function getSuggestionValue(suggestion) {
  return `${suggestion}`;
}

function renderSuggestion(suggestion, { query }) {
  const matches = AutosuggestHighlightMatch(suggestion, query);
  const parts = AutosuggestHighlightParse(suggestion, matches);

  return (
    <span className={"suggestion-content " + suggestion}>
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? "highlight" : null;

            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    </span>
  );
}


// <Calendar searchBy={"state"} searchCriteria={"NJ"}/>
class CalendarWrapper extends Component{
  constructor(props) {
    super(props);
    this.state = {
      searchCriteria: 'NJ'
    };
  }


  //we keep searchCriteria in state
  render() {
    return(
        <Calendar searchBy={"state"} searchCriteria={this.state.searchCriteria}/>
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
      currentComponent: "/main",
      componentParameters: 'NJ',
      loggedInStatus : false,
      validSearch: false,
      value: "",
      suggestions: []
    };

    this.searchValue = this.searchParser.bind(this);

  }

  //this function determines whether the search is a state or person, and then routes appropriately
  searchParser(input){  
    console.log('running search parser');
    for(var i = 0; i < data.length; i++) {
      //if the search parameter is in our data source
      if(input.toLowerCase() === data[i].toLowerCase()) {
        console.log('found input');
        if (i<55) {
          console.log('its a state');
          return '/state';
        } else {
          console.log('its a person');
          return '/politician';
        }
      }
    };
   return '/main';
  }

  onChange = (event, { newValue, method }) => {
    var newCurrentComponent = this.searchParser(newValue);
    console.log('newCurrentComponent', newCurrentComponent);

    //Last line - if our new currentComponent based on the search is a state or politician
    //it is a valid search, and so then we should render, otherwise, we should now
    this.setState({
      value: newValue,
      currentComponent: newCurrentComponent,
      componentParameters: newValue,
      validSearch: (newCurrentComponent == '/state' || newCurrentComponent == '/politician') ? true : false
    });

  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render(){
    {
      const { value, suggestions } = this.state;
      const inputProps = {
      placeholder: "Search",
      value,
      onChange: this.onChange
    };
    return (
      <div id="App">
        <UpdatedNavBar />

        <Autosuggest 
          style={style}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />

        {this.state.validSearch &&
          <Route exact path='/calendar' component = {CalendarWrapper} />
        }
          
        <Footer />
      </div>
    );
    }
  }
}



export default App;


