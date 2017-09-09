import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

var divStyle = {
  background: "#eee",
  padding: "20px",
  margin: "0 auto",
  width: "50%" 
};



class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name; 

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }



  render() {
    return (
    <div>
     <h3>Add an Event</h3>

      <form style={divStyle} onSubmit={this.handleSubmit}>
       
    <div class="input-field col s6">
      <label class="active">
          Event:
          <input name="event" type="text" value={this.state.event} onChange={this.handleChange} />
      </label>
    </div>
    
    <div class="input-field col s6">
      <label class="active">
          State:
          <input name="state" type="text" value={this.state.state} onChange={this.handleChange} />
      </label>
    </div>

    <div class="input-field col s6">
      <label class="active">
          Start Date:
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <DatePicker hintText="Enter Date" />
          </MuiThemeProvider>
      </label>
    </div>

  <div class="input-field col s6">
      <label class="active">
          End Date:
           <MuiThemeProvider muiTheme={getMuiTheme()}>
            <DatePicker hintText="Enter Date" />
          </MuiThemeProvider>
          <input name="end" type="text" class="datepicker" value={this.state.end} onChange={this.handleChange} />
      </label>
    </div>   


    <div class="input-field col s6">
      <label class="active">
          Description:
          <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />
      </label>
    </div>

        <input type="submit" value="Submit" />


      </form>
      </div>
    );
  }
}

export default Form;

