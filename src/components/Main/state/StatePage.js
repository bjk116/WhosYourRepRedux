import React from "react";
import TopStateDonors from './subcomponents/TopStateDonors';
import PleaseSearchState from '../pleaseSearch/PleaseSearch';

class StatePage extends React.Component {
	render() {
		if(!this.props.stateID) {
			return (
				<div>
					<PleaseSearchState />
				</div>
			);
		} else {		
			return(
				<div>
					<TopStateDonors stateID={this.props.stateID}/>
				</div>
			);
		}
	}
}

export default StatePage;