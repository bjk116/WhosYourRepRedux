import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import States from '../searchBar/dataSource';
import TimePicker from 'material-ui/TimePicker';
import axios from 'axios';
import Style from "./style.css";

var divStyle = {
  background: "#eee",
  padding: "20px",
  margin: "0 auto",
  width: "50%" 
};

var selectStyle = {
  // width: "80%",
  // margin: "50px"
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
                    value: '',
                    controlledDate: null,
                    startTime: null,
                    endTime: null,
                    state: '',
                    fruit: ''
                  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }

  handleDateChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
  };

  handleChangeStartTime = (event, date) => {
    this.setState({startTime: date});
  };

  handleChangeEndTime = (event, date) => {
    this.setState({endTime: date});
  };

  handleTextAreaChange(event) {
    this.setState({description: event.target.value});
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

  addEventToDatabase(information) {

  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    //Should do basic error checking here
      //Make sure date picked is in the future
      if(this.state.controlledDate){
        alert('blah');
      }
      //Make sure the times make sense, ie start time can't be afterend time
      //make sure all fields are filled out
    //If there are no errors, add to database
    axios.post('/user/create', {
        user: 'userPlaceHolder',
        state: this.state.state,
        title: this.state.event,
        start: this.state.controlledDate,
        end: this.state.endTime,
        desc: this.state.description
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
              <input name="address" type="text" value={this.state.address} onChange={this.handleChange} />
          </label>
        </div>

        <div class="input-field col s6">
          <label class="active">
              City:
              <input name="city" type="text" value={this.state.city} onChange={this.handleChange} />
          </label>
        </div>

        <div class="input-field col s12">
          <div style={selectStyle}>
            <label>
              Pick your favorite La Croix flavor:
              <select value={this.state.fruit} onChange={this.handleChange}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
              </select>
            </label>
          </div>
        </div>

        <div class="input-field col s6">
          <label class="active">
              Date:
              <MuiThemeProvider muiTheme={getMuiTheme()}>
                <DatePicker 
                  hintText="Enter Date"
                  id="dateOfEvent"
                  value={this.state.controlledDate}
                  onChange={this.handleDateChange}              
                />
              </MuiThemeProvider>
          </label>
        </div>

        <div class="input-field col s6">
            <label class="active">
              Start Time:
              <MuiThemeProvider muiTheme={getMuiTheme()}>
                <TimePicker
                  hintText="Start Time"
                  minutesStep={5}
                  value={this.state.startTime}
                  onChange={this.handleChangeStartTime} 
                />
              </MuiThemeProvider>
            </label>
        </div>   

        <div class="input-field col s6">
            <label class="active">
              End Time:
              <MuiThemeProvider muiTheme={getMuiTheme()}>
                <TimePicker
                  hintText="Start Time"
                  minutesStep={5}
                  value={this.state.endTime}
                  onChange={this.handleChangeEndTime}
                />
              </MuiThemeProvider>
            </label>
        </div>

        <div class="input-field col s6">
              <label for="textarea1">Description</label>
              <textarea id="textarea1" className="materialize-textarea" value={this.state.description} onChange={this.handleTextAreaChange}></textarea>
        </div>

        <input type="submit" value="Submit" />


        </form>
      </div>
    );
  }
}

export default Form;

/*            <label>
                State:
              <select onChange={this.handleChange} value={this.state.state} name="state">
                <option value="" disabled selected>Choose your option</option>
                {States.map(States=>
                  <option value={States}>{States}</option>
                )}
              </select>
            </label>
            */