//import './politicians.css';

import React from "react";
import axios from 'axios';
import { Chart } from 'react-google-charts';

function renderListOfRoles(roles) {
  for (var i = 0; i < roles.length; i++) {
    <li>roles[i]</li>
  }
}

// Creating the Results component
class Politician extends React.Component {

    getPoliticianData(userInputForPolitician) {

      axios({
        url: "/politician/" + userInputForPolitician,
        method: "GET",
      }).then((resp)=>{
        //console.log(resp.data);
        var fullName = resp.data[0].name;
        var firstName = fullName.split(' ').slice(0, -1).join(' ');
        var twitPicURL = "https://twitter.com/" + resp.data[0].twitterHandle +"/profile_image?size=original";
        var party;

        if (resp.data[0].party === "R") {
          party = "Republican";
        }else if (resp.data[0].party === "D") {
          party = "Democrat";
        }else {
          party = resp.data[0].party;
        }

        this.setState({
          politicianName: resp.data[0].name,
          politicianState: resp.data[0].state,
          politicianPosition: resp.data[0].position,
          politicianParty: party,
          politicianTwitterHandle: resp.data[0].twitterHandle,
          politicianEndOfTerm: resp.data[0].endOfTerm,
          // politicianDonors: resp.data[0].donors,
          politicianRoles: resp.data[0].roles,
          politicianProPublicaID: resp.data[0].proPublicaId,
          polCID: resp.data[0].cid,
          politicianFirstName: firstName,
          twitterPicURL: twitPicURL
        });

      });

    }

    getDonorData(userInputForPolitician) {
      console.log('running donors data');


      var industryDonors = [["Industry", "Total"]]; 
        var secondQuery = '/donors/' + userInputForPolitician;
        axios({
          method: 'GET',
          url: secondQuery,
          responseType: 'json'
        }).then((resp)=>{
          console.log(resp);
        });
    }



    constructor(props) {
      super(props);

      this.state = {
        politicianName: undefined,
        politicianState: undefined,
        politicianPosition: undefined,
        politicianParty: undefined,
        politicianTwitterHandle: undefined,
        politicianEndOfTerm: undefined,
        politicianDonors: undefined,
        politicianRoles: undefined,
        politicianProPublicaID: undefined,
        polCID: undefined,
        politicianFirstName: undefined,
        twitterPicURL: undefined

      }
      this.getPoliticianData = this.getPoliticianData.bind(this);
      this.getDonorData = this.getDonorData.bind(this);
    }

    componentDidMount() {
      // below line is for rendering dynamic data, for setup purposes I'm using one politician's CID for now
      // var politicianCID = this.props.politicianCid;

      var politicianCID = "N00000575";
      this.getPoliticianData(politicianCID);
      this.getDonorData(politicianCID);

    }


  // Here we render the function
  render() {
    console.log(this.state);
    
    return (
      <div>
        <h4>{this.state.politicianName}</h4>
        <div className="divider"></div>
        <div className="section">
          <div className="row">
              <h5>Information on this fine statesman</h5>
              <br></br>
              <div className="col s12 m8 l4">
                <h5>Take a good look at {this.state.politicianFirstName}</h5>
                <img src={this.state.twitterPicURL} alt={this.state.politicianName} className="circle"></img>
              </div>
              <div className="col s12 m8 l4">
                <h5>{this.state.politicianFirstName} is a {this.state.politicianParty} and a {this.state.politicianPosition} for the state of {this.state.politicianState} with an end to their current term on {this.state.politicianEndOfTerm}.</h5>
              </div>
              <div className="col s12 m8 l4">
                <h5>Member of the following committees:</h5>
                <ul>
                  <li>{this.state.politicianRoles}</li>
                </ul>
              </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="section">
        <h5>Contributions for most recent election cycle by industry</h5>
        <Chart
          chartType="ColumnChart"
          data={this.state.politicianDonors}
          options={{
            // title: "Contributions for most recent election cycle by industry",
            // legend: { position: 'top' },
          }}
          width="100%"
        />
        </div>
        <div className="divider"></div>
        <div className="section">
        <h5>Section 3</h5>
        <p>Stuff</p>
        </div>
      
      </div>
    
    );
  }

}

export default Politician;