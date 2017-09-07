import React, {Component} from "react";
import AutoComplete from "material-ui/AutoComplete";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import JSONP from "jsonp";
import Source from "./dataSource";

const googleAutoSuggestURL = `
  //suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`;
const data = Source;

class MaterialUIAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.state = {
      dataSource : [],
      inputValue : ""
    }
  }
//function to change items in autocomplete
  onUpdateInput(inputValue) {
    const self = this;
    this.setState({
      inputValue: inputValue
    }, function() {
      self.performSearch();
    });
  }
//actual autocomplete funtion
  performSearch() {
    const
      self = this,
      url  = googleAutoSuggestURL + this.state.inputValue;

    if(this.state.inputValue !== "") {
      JSONP(url, function(error, data) {
        let searchResults, retrievedSearchTerms;

        if(error) return error;

        searchResults = data[1];

        retrievedSearchTerms = searchResults.map(function(result) {
          return result[0];
        });

        self.setState({
          dataSource: retrievedSearchTerms
        });
      });
    }
  }
  //render the autocompleting search line
  render() {
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AutoComplete
        dataSource = {this.state.dataSource}
        onUpdateInput = {this.onUpdateInput} />
      </MuiThemeProvider>
  }
}

export default MaterialUIAutocomplete;