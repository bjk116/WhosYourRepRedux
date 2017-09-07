import React from "react";
import axios from 'axios';
import DonorChart from './DonorChart';

class TopStateDonors extends React.Component {

	getTopStateDonors() {
		var opensecetsAPIKey = 'ae20f4a9d0bfa0a12552aa9c592440cb';

		var queryStateID = 'NJ';
		var queryURL = 'http://www.opensecrets.org/api/?method=getLegislators&id=' + queryStateID + '&apikey=' + opensecetsAPIKey + '&output=json';
		var polsCID = [];
		var polsDonors = [];

		axios({
		  	method:'GET',
		  	url: queryURL,
		    responseType: 'json'
		}).then((resp) => {
			// console.log(resp);
			for (var i = 0; i < resp.data.response.legislator.length; i++) {
				polsCID.push(resp.data.response.legislator[i]['@attributes'].cid);
			}
			// console.log(polsCID);
			for (var i = 0; i < polsCID.length; i++) {

				var queryURLTwo = 'http://www.opensecrets.org/api/?method=candIndustry&cid='+ polsCID[i] + '&apikey=' + opensecetsAPIKey + '&output=json';

				axios({
					method: 'GET',
					url: queryURLTwo,
					responseType: 'json'
				}).then((resp)=> {
					// console.log(resp.data.response.industries['@attributes'].cand_name);
					// console.log();
					// console.log(resp);
					polsDonors.push({
						politician: resp.data.response.industries['@attributes'].cand_name,
						industries: resp.data.response.industries.industry
					});
				});
			}
			//console.log(polsDonors);
		});


		this.setState({
			politiciansDonors: polsDonors
		});


		// make an API call to opensecrets getLegislators by state name to get list of reps which includes their CID identifier
		// push politician CIDs to politicansCID array
		// make a for loop that makes an API call to opensecrets candIndustry to get list of industries that donated to the politician by their CID
			// create an object for each politican to store their name, CID, and industry donors and and push it to this.state object
	}

	constructor(props) {
		super(props);

		this.state = {
			// stateID: this.props.stateID
			politiciansDonors: []
		}
	}

	componentDidMount() {
		this.getTopStateDonors();
		// console.log('component mounted');
	}

	render() {
		return (
			<div>
				<h1>State Info for New Jersey</h1>
				<DonorChart donorsData={this.state.politiciansDonors} />
			</div>
		);
	}
}

export default TopStateDonors;