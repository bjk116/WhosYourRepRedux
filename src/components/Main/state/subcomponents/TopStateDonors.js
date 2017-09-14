import React from "react";
import axios from 'axios';
// import DonorChart from './DonorChart';
import { Chart } from 'react-google-charts';
import stateHelper from '../../searchBar/helper';

class TopStateDonors extends React.Component {

	getPoliticianDonorTotals(userInputForStateID) {

		var politiciansDonorSum = [["Politician", "Total"]];

		axios({
			url: "/reps/" + userInputForStateID,
			method: "GET",
		}).then((resp)=>{
			// console.log(resp);
			// console.log(resp.data[0]);
			// console.log(resp.data[0].name);
			// console.log(resp.data[0].position);
			// console.log(resp.data[0].party);
			for (var i = 0; i < resp.data.length; i++) {
				var polNamePartyPosition = resp.data[i].position + " " + resp.data[i].name + " (" + resp.data[i].party + ")";
				// console.log(polNamePartyPosition);
			
				var totalIndusContributions = 0;

				for (var j = 0; j < resp.data[i].donors.length; j++) {
					totalIndusContributions += parseInt(resp.data[i].donors[j].total);
					
				}
				politiciansDonorSum.push([polNamePartyPosition, totalIndusContributions]);
			}
			// console.log(politiciansDonorSum);
			this.setState({
				politiciansDonors: politiciansDonorSum
			});

		});

	}



	getNumofRepsAndDems(userInputForStateID) {

		var demReps = 0;
		var repReps = 0;

		var queryURLProPublica = "https://api.propublica.org/congress/v1/members/house/" + userInputForStateID+ "/current.json";
		axios({
			url: queryURLProPublica,
			method: "GET",
			dataType: 'json',
			headers: {'X-API-Key': '45Jqi2YUkG5u36euvspZI9yLR0dAOrz545XRSwW1'}
		}).then((resp)=>{
			var stateResults = resp.data.results;
			// console.log(resp);
			// console.log(stateResults[0]);

			for (var i = 0; i < stateResults.length; i++) {
				if (stateResults[i].party === "D") {
					demReps++;
				}else if (stateResults[i].party === "R") {
					repReps++;
				}
			}
		// console.log("D: " + demReps);
		// console.log("R: " + repReps);

			this.setState({
				stateHouseReps: repReps,
				stateHouseDems: demReps
			});

		});


	}

	constructor(props) {
		super(props);
		var stateName = stateHelper.initialsToState(this.props.stateID);
		this.state = {
			politiciansDonors: undefined,
			stateHouseReps: undefined,
			stateHouseDems: undefined,
			longState: stateName
		}

		this.getNumofRepsAndDems = this.getNumofRepsAndDems.bind(this);
	}

	componentDidMount() {
		console.log("component mounted with props of: " + this.props.stateID);
		var stateID = this.props.stateID;
		this.getPoliticianDonorTotals(stateID);
		this.getNumofRepsAndDems(stateID);
	}

	render() {
		console.log(this.state.politiciansDonors);
		// console.log(this.props.stateID + " Democrats: " + this.state.stateHouseDems);
		// console.log(this.props.stateID + " Republicans: " + this.state.stateHouseReps);
		
		return (
			<div className = "row">
				<h1>State Info for {this.props.stateID}</h1>
				<h4>View <a href={'/calendar/'+this.props.stateID}>Calendar</a></h4>
				<div className = "divider"></div>
				<div className = "col s8 m8 lg8">
				{/*<DonorChart donorsData={this.state.politiciansDonors} />*/}
				<Chart
					chartType="BarChart"
					data={this.state.politiciansDonors}
					options={{
						title: "Total industry contributions for each of the state's national-level politicians",
						legend: { position: 'top', maxLines: 4 },
						// isStacked: true,
						// bar: { groupWidth: '25%'}
					}}
					graph_id="BarChart"
					width="100%"
					height="600px"
					legend_toggle
				/>
				</div>
				<div className = "col s4 m4 lg4">
				<Chart 
					chartType="PieChart"
					data={[
							["Party", "Qty"],
							["Democrats", this.state.stateHouseDems],
							["Republicans", this.state.stateHouseReps]
						]}
					options={{
							title: "Number of Republican and Democrat Representatives for state",
							is3D: true
						}}

				/>
				</div>
			</div>
		);
	}
}

export default TopStateDonors;