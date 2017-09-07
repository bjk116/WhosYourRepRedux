import React from "react";
import axios from 'axios';
import DonorChart from './DonorChart';

class TopStateDonors extends React.Component {

	getTopStateDonors(userInputForStateID) {
		var opensecetsAPIKey = 'ae20f4a9d0bfa0a12552aa9c592440cb';

		var queryURL = 'http://www.opensecrets.org/api/?method=getLegislators&id=' + userInputForStateID + '&apikey=' + opensecetsAPIKey + '&output=json';

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
					// console.log(resp);
					polsDonors.push({
						politician: resp.data.response.industries['@attributes'].cand_name,
						industries: resp.data.response.industries.industry
					});
				});
			}
		});
		// console.log(polsDonors);

		this.setState({
			politiciansDonors: polsDonors
		});

	}

	constructor(props) {
		super(props);

		this.state = {
			politiciansDonors: []
		}

	}

	componentDidMount() {
		console.log("component mounted with manually entered props of: " + this.props.stateID);
		var stateID = this.props.stateID;
		this.getTopStateDonors(stateID);
	}

	render() {
		console.log(this.state.politiciansDonors);
		return (
			<div>
				<h1>State Info for New Jersey</h1>
				<DonorChart donorsData={this.state.politiciansDonors} />
			</div>
		);
	}
}

export default TopStateDonors;