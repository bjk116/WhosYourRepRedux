import React from "react";
import Source from "./dataSource";
import Autosuggest from "react-autosuggest";
import Styles from "./style.css";

var AutosuggestHighlightMatch = require("autosuggest-highlight/match");
var AutosuggestHighlightParse = require("autosuggest-highlight/parse");
var style = Styles;
var data = Source;

// class SearchBar extends React.Component {

//   render() 

//     return (
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
// export default SearchBar;
