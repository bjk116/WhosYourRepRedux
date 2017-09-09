import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import States from "../searchBar/dataSource";
import TimePicker from 'material-ui/TimePicker';


var divStyle = {
  background: "#eee",
  padding: "20px",
  margin: "0 auto",
  width: "50%" 
};

var selectStyle = {
  width: "80%",
  margin: "50px"
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
    console.log(this.state);
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
          Address:
          <input name="state" type="text" value={this.state.state} onChange={this.handleChange} />
      </label>
    </div>

    <div class="input-field col s6">
      <div style={selectStyle}>
        <select>
          <option value="" disabled selected>Choose your option</option>
          {States.map(States=>
            <option value={States}>{States}</option>
          )}
        </select>
        <label>
            State:
        </label>
      </div>
    </div>

    <div class="input-field col s6">
      <label class="active">
          Date:
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <DatePicker hintText="Enter Date" />
          </MuiThemeProvider>
          <input name="date" type="text" class="datepicker" value={this.state.end} onChange={this.handleChange} />
      </label>
    </div>

  <div class="input-field col s6">
      <label class="active">
        Start Time:
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <TimePicker
            hintText="Start Time"
            minutesStep={5}
          />
        </MuiThemeProvider>
        <input name="startTime" type="text" class="datepicker" value={this.state.end} onChange={this.handleChange} />
      </label>
  </div>   

  <div class="input-field col s6">
      <label class="active">
        End Time:
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <TimePicker
            hintText="Start Time"
            minutesStep={5}
          />
        </MuiThemeProvider>
        <input name="endTime" type="text" class="datepicker" value={this.state.end} onChange={this.handleChange} />
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

