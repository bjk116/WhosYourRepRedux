import React from "react";
import Source from "./dataSource";
import Autosuggest from "react-autosuggest";
import Styles from "./style.css";

var AutosuggestHighlightMatch = require("autosuggest-highlight/match");
var AutosuggestHighlightParse = require("autosuggest-highlight/parse");
var style = Styles;
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

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: []
    };    
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
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

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest 
        theme={style}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
    );
  }
}

export default SearchBar;
