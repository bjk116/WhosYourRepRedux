import React, { Component } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Calendar from "./components/Main/calendar/Calendar";
import PieChart from "./components/Main/chart/chart";
import Politician from "./components/Main/politician/Politician";
import StatePage from "./components/Main/state/StatePage";
import Form from "./components/Main/Form/Form";
import Trending from "./components/Main/Trending/Trending";
import UpdatedNavBar from './components/Navbar/UpdatedNavBar';
import LoginError from './components/testComponents/LoginError';
import axios from 'axios';
import themeable from 'react-themeable';
import Hero from "./components/hero/Hero";

//React Router
import { BrowserRouter as Router, Route } from "react-router-dom";

//Searchbar stuff
import Source from "./components/Main/searchBar/dataSource";
import Autosuggest from "react-autosuggest";
import SearchStyle from "./styles/searchStyle.css";

//SearchBar Functions
var AutosuggestHighlightMatch = require("autosuggest-highlight/match");
var AutosuggestHighlightParse = require("autosuggest-highlight/parse");
var data = Source;
var theme = {
  foo: 'Autosuggest__foo',
};

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
        <Calendar searchCriteria={this.state.searchCriteria}/>
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

    //change componentParameter to currentState
    this.state = {
      currentComponent: "/main",
      componentParameters: 'NJ',
      currentState: 'NJ',
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
          //find what initials it is
          //set the currentState

          return '/state';
        } else {
          console.log('its a person');
          return '/politician';
        }
      }
    };
   return '/trending';
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
      validSearch: (newCurrentComponent === '/state' || newCurrentComponent === '/politician') ? true : false
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
  
  checkAuth() {
    axios({
      url: '/user',
      method: 'get'
    }).then((resp)=>{
      console.log(resp);
    });
  }


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
        <UpdatedNavBar currentState={this.state.currentState}/>

        <Autosuggest 
          theme={SearchStyle}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />

        <Router>
          <div>
            <Route path="/state/:stateParam?" component={StatePage}/>
            <Route path="/calendar/:stateParam?" component={CalendarWrapper}/>
            <Route exact path = "/" component={Hero} />
          </div>
        </Router>
      
        <Footer />
        
      </div>
    );
    }
  }
}

export default App;