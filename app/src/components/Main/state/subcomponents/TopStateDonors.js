import React from "react";
import axios from 'axios';
// import DonorChart from './DonorChart';
import { Chart } from 'react-google-charts';

class TopStateDonors extends React.Component {

	getTopStateDonors(userInputForStateID) {
		console.log("getTopStateDonors method starts");
		var opensecetsAPIKey = '2c976051a159c1c4c3961d853d3b4fb4';

		var queryURL = 'http://www.opensecrets.org/api/?method=getLegislators&id=' + userInputForStateID + '&apikey=' + opensecetsAPIKey + '&output=json';

		var polsCID = [];
		var polsDonors = [];

		function pushObjToArray(object) {
			polsDonors.push(object);
			// console.log(object);
		}

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
					var data = {
						politician: resp.data.response.industries['@attributes'].cand_name,
						industry1: resp.data.response.industries.industry[0]['@attributes'].industry_name + ": $" + resp.data.response.industries.industry[0]['@attributes'].total,
						industry2: resp.data.response.industries.industry[1]['@attributes'].industry_name + ": $" + resp.data.response.industries.industry[1]['@attributes'].total,
						industry3: resp.data.response.industries.industry[2]['@attributes'].industry_name + ": $" + resp.data.response.industries.industry[2]['@attributes'].total,
						industry4: resp.data.response.industries.industry[3]['@attributes'].industry_name + ": $" + resp.data.response.industries.industry[3]['@attributes'].total,
						industry5: resp.data.response.industries.industry[4]['@attributes'].industry_name + ": $" + resp.data.response.industries.industry[4]['@attributes'].total,
						industry6: resp.data.response.industries.industry[5]['@attributes'].industry_name + ": $" + resp.data.response.industries.industry[5]['@attributes'].total,
						industry7: resp.data.response.industries.industry[6]['@attributes'].industry_name + ": $" + resp.data.response.industries.industry[6]['@attributes'].total,
						industry8: resp.data.response.industries.industry[7]['@attributes'].industry_name + ": $" + resp.data.response.industries.industry[7]['@attributes'].total,
						industry9: resp.data.response.industries.industry[8]['@attributes'].industry_name + ": $" + resp.data.response.industries.industry[8]['@attributes'].total,
						industry10: resp.data.response.industries.industry[9]['@attributes'].industry_name + ": $" + resp.data.response.industries.industry[9]['@attributes'].total,
					};
					pushObjToArray(data);
	
				});
			}

		});

		this.setState({
			politiciansDonors: polsDonors
		});
	}

		// var queryURLProPublica = 'https://api.propublica.org/congress/v1/members/house/NJ/5/current.json';
		// axios({
		// 	url: queryURLProPublica,
		// 	method: "GET",
		// 	dataType: 'json',
		// 	headers: {'X-API-Key': '45Jqi2YUkG5u36euvspZI9yLR0dAOrz545XRSwW1'}
		// }).then((resp)=>{
		// 	console.log(resp);
		// });

	constructor(props) {
		super(props);

		this.state = {
			politiciansDonors: undefined
		}
	}

	componentDidMount() {
		console.log("component to be mounted with manually entered props of: " + this.props.stateID);
		var stateID = this.props.stateID;
		this.getTopStateDonors(stateID);
	}

	render() {
		console.log(this.state.politiciansDonors);
		return (
			<div>
				<h1>State Info for {this.props.stateID}</h1>
				{/*<DonorChart donorsData={this.state.politiciansDonors} />*/}
				<Chart
					chartType="BarChart"
					data={[
						["Politcian", "Industry 1", "Industry 2"],
						["Cory Booker", 399, 955],
						["Norcross", 343, 342]
						]}
					options={{
						title: "Donors for Each of the state's politicans",
						legend: { position: 'top', maxLines: 4 },
						isStacked: true,
						bar: { groupWidth: '25%'}
					}}
					graph_id="BarChart"
					width="100%"
					height="400px"
					legend_toggle
				/>
			</div>
		);
	}
}

export default TopStateDonors;