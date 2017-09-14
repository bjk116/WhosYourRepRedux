cimport React, { Component } from "react";
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
import politicianToCid from './helper/politicianToCID';
import Hero from "./components/hero/Hero";

//initials converter
import stateHelper from './components/Main/searchBar/helper';


//React Router
import { Route, Redirect, Switch } from "react-router-dom";

//Searchbar stuff
import Source from "./components/Main/searchBar/dataSource";
import stateInitials from "./components/Main/searchBar/initals";
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

class App extends Component {
  constructor(){
    super();

    //change componentParameter to currentState
    this.state = {
      currentComponent: '',
      currentProp: '',
      loggedInStatus : false,
      validSearch: false,
      value: "",
      suggestions: [],
      redirect: false

    };

    this.searchParser = this.searchParser.bind(this); 
  }

  //this function determines whether the search is a state or person, and then routes appropriately
  searchParser(input){  
    console.log('running search parser');
    for(var i = 0; i < data.length; i++) {
     //if the search parameter is in our data source
     if(input.toLowerCase() === data[i].toLowerCase()) {
       if (i<55) {
        console.log('its a state');
        var initials = stateInitials[i];
          
        console.log('initialsAPP', initials);
          
        this.setState({
          currentComponent: '/state',
          currentProp: '/'+initials,
          redirect: true
        });
        } else if(i>55) {
          //get senator id, and set state to currentComponent politician, currentProp cid
          console.log(politicianToCid);
          /*.forEach(function(rep) {
            if(rep.name.toLowerCase() == input.toLowerCase()) {
              this.setState({
                currentComponent: '/politician',
                currentProp: '/'+rep.cid,
                redirect: true
              });
            }
          });*/
        } 
      }
    }
  };

  onChange = (event, { newValue, method }) => {
    this.searchParser(newValue);

    //Last line - if our new currentComponent based on the search is a state or politician
    //it is a valid search, and so then we should render, otherwise, we should now
    this.setState({
      value: newValue,
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
      //className: "browser-default",
      placeholder: "Search",
      value,
      onChange: this.onChange
    };

    const redirect = this.state.redirect;
    
    if(redirect) {
      return <Redirect to={this.state.currentComponent+this.state.currentProp} />
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


          <div>
            <Switch>
              <Route path="/state/:stateParam?" 
                render={({match})=>(
                  <StatePage 
                    stateID={match.params.stateParam}
                  />
                  )}
              />
              <Route exact path='/calendar/:stateParam?' 
                render={({match}) => (
                  <Calendar 
                    searchCriteria={match.params.stateParam}
                  />
                )}
              />
              <Route exact path='/politician/:cid?' 
                render={({match}) => (
                  <Politician 
                    politicianCid={match.params.cid}
                  />
                )}
              />
              <Route exact path = "/" component={Hero} />
            </Switch>
          </div>


        <Footer />
        
      </div>
    );
    }
  }
}

export default App;