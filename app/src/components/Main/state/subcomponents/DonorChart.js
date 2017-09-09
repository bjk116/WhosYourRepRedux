import React from "react";
import { Chart } from 'react-google-charts';

class DonorChart extends React.Component {

	renderGoogleChart() {
		var chartData = this.props.donorsData;
		console.log(chartData);	
	}


	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.renderGoogleChart();
	}


	render() {
		return(
			<h1>Industry donors chart</h1>
		);
	}
}

export default DonorChart;