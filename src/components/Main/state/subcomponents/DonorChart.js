import React from "react";
import { Chart } from 'react-google-charts';

class DonorChart extends React.Component {

	setChartData() {
		console.log("search data function");
		var chartData = this.props.donorsData;		
		console.log(chartData);

	}


	constructor(props) {
		super(props);
		// this.state = {
		// 	options: {
		// 		// title: "Top Donors for Each of the state's politicans",
		// 		// legend: { position: 'top', maxLines: 4 },
		// 		// isStacked: true,
		// 		// bar: { groupWidth: '75%'}
		// 	},

		// 	data: {}
		// }
	}

	componentDidMount() {
		this.setChartData();
	}


	render() {
		return(
			<h1>Industry donors chart</h1>
		);
	}
}

export default DonorChart;