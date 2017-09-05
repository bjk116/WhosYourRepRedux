import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import './chart.css';

const Chart = ReactGoogleCharts.default.Chart
console.log()
class PieChart extends React.Component {
        render(){
            return (
    <div className={"chart-container"}>
      <Chart
        chartType="PieChart" 
        data={[['Task', 'Hours per Day'],
              ['Work', 8],
              ['Friends', 2],
              ['Eat', 2],
              ['TV', 3],
              ['Gym', 2],
              ['Sleep', 7]]}
        options={{}}
        graph_id="PieChart"
        width="300%"
        height="400px"
        legend_toggle
       />
    </div>
    )
        }
      }

      PieChart.propTypes = {
          src: React.PropTypes.string.isRequired
      };

      class Label extends React.Component {
        render() {
            return <p className="default-label" {...this.props}> Hello World <span className="name"> {
                this.props.name
            } </span>
            </p>;
        }
      }

      class Input extends React.Component {
        render() {
            return <input
                className="default-input"
                placeholder="Enter your name"
                {...this.props}
                type="text"
             />;
        }
      }

      class PieChartWidget extends React.Component{
        constructor(props) {
          super(props);
          this.handleChange = this.handleChange.bind(this)
          this.state = {
                name: ''
          };
        }

        handleChange(e) {
          this.setState({
            name: e.target.value
          });
        }

        render() {
            return <div className="widget">
                <PieChart className="center" src="http://goo.gl/fx5Zwn"/>
                <Label className="default-label" name={this.state.name} />
                <Input className="default-input" onChange={this.handleChange} /> </div>;
        }
      }

      export default PieChart;

      