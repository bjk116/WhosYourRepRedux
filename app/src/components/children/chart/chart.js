import { Chart } from 'react-google-charts';
import React from 'react';

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Dummy Data',
        hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
      data: [
      ['Task', 'Hours per Day'],
      ['Work', 8],
      ['Friends', 2],
      ['Eat', 2],
      ['TV', 3],
      ['Gym', 2],
      ['Sleep', 7]
      ],
    };
  }
  render() {
    return (
      <Chart
        chartType="PieChart"
        data={this.state.data}
        options={this.state.options}
        graph_id="PieChart"
        width="100%"
        height="400px"
        legend_toggle
      />
    );
  }
}
export default PieChart;