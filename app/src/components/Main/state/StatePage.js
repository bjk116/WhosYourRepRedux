import React from "react";
import TopStateDonors from './subcomponents/TopStateDonors';

class StatePage extends React.Component {
	render() {
		return(
			<div>
				<TopStateDonors stateID={'NJ'}/>
			</div>
		);
	}
}

export default StatePage;