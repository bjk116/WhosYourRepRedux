//import './politicians.css';

import React from "react";
import axios from 'axios';
import { Chart } from 'react-google-charts';
import moment from "moment";

// function renderListOfRoles(roles) {
//   for (var i = 0; i < roles.length; i++) {
//     <li>roles[i]</li>
//   }
// }


// Creating the Results component
class Politician extends React.Component {

    getPoliticianData(userInputForPolitician) {

      axios({
        url: "/politician/" + userInputForPolitician,
        method: "GET",
      }).then((resp)=>{
        console.log(resp.data);
        var fullName = resp.data[0].name;
        var firstName = fullName.split(' ').slice(0, -1).join(' ');
        var twitPicURL = "https://twitter.com/" + resp.data[0].twitterHandle +"/profile_image?size=original";
        var twitURL = "https://twitter.com/" + resp.data[0].twitterHandle;
        var party;
        var partyPicture;

        var formatEndTermDate = moment(resp.data[0].endOfTerm).format("MM-DD-YYYY");

        if (resp.data[0].party === "R") {
          party = "Republican";
          partyPicture = "http://diysolarpanelsv.com/images/clipart-of-the-republican-elephant-3.png";
        }else if (resp.data[0].party === "D") {
          party = "Democrat";
          partyPicture = "http://eastoncourier.hanewsmedia.com/wp-content/uploads/sites/41/2013/07/Democratic-donkey.jpg";
        }else {
          party = resp.data[0].party;
          partyPicture = "https://apushcanvas.pbworks.com/f/1350159361/American-Political-Parties.jpg";
        }



        this.setState({
          politicianName: resp.data[0].name,
          politicianState: resp.data[0].state,
          politicianPosition: resp.data[0].position,
          politicianParty: party,
          politicianTwitterHandle: resp.data[0].twitterHandle,
          politicianEndOfTerm: formatEndTermDate,
          // politicianDonors: resp.data[0].donors,
          politicianRoles: resp.data[0].roles,
          politicianProPublicaID: resp.data[0].proPublicaId,
          polCID: resp.data[0].cid,
          politicianFirstName: firstName,
          twitterPicURL: twitPicURL,
          twitterURL: twitURL,
          partyPic: partyPicture
        });

      });

    }

    getDonorData(userInputForPolitician) {
      console.log('running donors data');

      var industryDonors = [["Indusry", "Total"]]; 
        var secondQuery = '/donors/' + userInputForPolitician;
        axios({
          method: 'GET',
          url: secondQuery,
          responseType: 'json'
        }).then((resp)=>{
          console.log(resp);
          
          resp.data.forEach(function(item) {
            var temp = [];
            temp[0] = item.industry;
            temp[1] = Number(item.total);
            industryDonors.push(temp);
          });

          console.log('industrydonors', industryDonors);
          this.setState({
            politicianDonors: industryDonors
          });
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
        twitterPicURL: undefined,
        twitterURL: undefined,
        partyPic: undefined

      }
      this.getPoliticianData = this.getPoliticianData.bind(this);
      this.getDonorData = this.getDonorData.bind(this);
    }

    componentDidMount() {
      // below line is for rendering dynamic data, for setup purposes I'm using one politician's CID for now
      // var politicianCID = this.props.politicianCid;

      var politicianCID = this.props.poliCid;
      this.getPoliticianData(politicianCID);
      this.getDonorData(politicianCID);

    }


  // Here we render the function
  render() {
    console.log(this.state);
    // var rolesArray = this.state.politicianRoles;

    // const listRoles = rolesArray.map((role) =>
    //   <li>{role}</li>
    // );
    
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
                <img src={this.state.twitterPicURL} alt={this.state.politicianName} className="circle responsive-img" width="300" height="300"></img>
              </div>
              <div className="col s12 m8 l4">
                <h4>Details on {this.state.politicianFirstName}</h4>
                <ol>
                  <li>{this.state.politicianParty}</li>
                  <li>{this.state.politicianPosition} for the state of {this.state.politicianState}</li>
                  <li>Current term ends on {this.state.politicianEndOfTerm}</li>
                  <li>Twitter handle: <a href={this.state.twitterURL} target="_blank">{this.state.politicianTwitterHandle}</a></li>
                </ol>
                <br></br>
                <h5>Member of the following committees:</h5>
                <p>{this.state.politicianRoles}</p>
                {/*<ol>{this.state.politicianRoles.map((role) =>
                      <li>{role}</li>
                    )}
                </ol>*/}
                
              </div>
              <div className="col s12 m8 l4">
                <img src={this.state.partyPic} alt={this.state.politicianName} className="circle responsive-img" width="300" height="300"></img>
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