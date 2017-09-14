//import './politicians.css';
import React from 'react';
import PleaseSearchPolitician from "../pleaseSearch/PleaseSearchPolitician";

// Creating the Results component
class Politician extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  // Here we render the function
  render() {
    if(!this.props.politicianCid) {
      return <PleaseSearchPolitician />
    } else {
    return (
      <div>

        <div class="col-lg-12">
          <div className="panel panel-primary">
            <div className="panel-heading text-center">
              <h3 className="panel-title">Politician</h3>
            </div>
            <div className="panel-body text-center">
               <h1>Data</h1>
                  <p>{this.props.name}</p>
            </div>
          </div>
        </div>
          
              
        <div class="col-lg-12">
          <div className="panel panel-primary">
            <div className="panel-heading text-center">
              <h3 className="panel-title">Basic Information</h3>
            </div>
            <div className="panel-body text-center">
               <h1>Data</h1>
                  <p>{this.props.information}</p>
            </div>
          </div>
        </div>
              
        <div class="col-lg-12">
          <div className="panel panel-primary">
            <div className="panel-heading text-center">
              <h3 className="panel-title">Tweets</h3>
            </div>
            <div className="panel-body text-center">
               <h1>Data</h1>
                  <p>{this.props.tweets}</p>
            </div>
          </div>
        </div>
               
        <div class="col-lg-12">
          <div className="panel panel-primary">
            <div className="panel-heading text-center">
              <h3 className="panel-title">Industry Donors</h3>
            </div>
            <div className="panel-body text-center">
               <h1>Data</h1>
                  <p>{this.props.donors}</p>
            </div>
          </div>
        </div>      
              
        <div class="col-lg-12">
          <div className="panel panel-primary">
            <div className="panel-heading text-center">
              <h3 className="panel-title">Next Re-Election Date</h3>
            </div>
            <div className="panel-body text-center">
               <h1>Data</h1>
                  <p>{this.props.election}</p>
            </div>
          </div>
        </div>
               
        <div class="col-lg-12">
          <div className="panel panel-primary">
            <div className="panel-heading text-center">
              <h3 className="panel-title">Proposed Bills</h3>
            </div>
            <div className="panel-body text-center">
               <h1>Data</h1>
                  <p>{this.props.bills}</p>
            </div>
          </div>
        </div>
      
      </div>
    
    );
  }
  }
};

export default Politician;