var initials = [
				"AK",
				"AL",
				"AR",
				"AZ",
				"CA",
				"CO",
				"CT",
				"DC",
				"DE",
				"FL",
				"GA",
				"GU",
				"HI",
				"IA",
				"ID",
				"IL",
				"IN",
				"KS",
				"KY",
				"LA",
				"MA",
				"MD",
				"ME",
				"MI",
				"MN",
				"MO",
				"MS",
				"MT",
				"NC",
				"ND",
				"NE",
				"NH",
				"NJ",
				"NM",
				"NV",
				"NY",
				"OH",
				"OK",
				"OR",
				"PA",
				"PR",
				"RI",
				"SC",
				"SD",
				"TN",
				"TX",
				"UT",
				"VA",
				"VI",
				"VT",
				"WA",
				"WI",
				"WV",
				"WY"];

var states = [ //States
			"Alaska",
                  "Alabama",
                  "Arkansas",
                  "Arizona",
                  "California",
                  "Colorado",
                  "Connecticut",
                  "District of Columbia",
                  "Delaware",
                  "Florida",
                  "Georgia",
                  "Guam",
                  "Hawaii",
                  "Iowa",
                  "Idaho",
                  "Illinois",
                  "Indiana",
                  "Kansas",
                  "Kentucky",
                  "Louisiana",
                  "Massachusetts",
                  "Maryland",
                  "Maine",
                  "Michigan",
                  "Minnesota",
                  "Missouri",
                  "Mississippi",
                  "Montana",
                  "North Carolina",
                  "North Dakota",
                  "Nebraska",
                  "New Hampshire",
                  "New Jersey",
                  "New Mexico",
                  "Nevada",
                  "New York",
                  "Ohio",
                  "Oklahoma",
                  "Oregon",
                  "Pennsylvania",
                  "Puerto Rico",
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Virginia",
                  "Virgin Islands",
                  "Vermont",
                  "Washington",
                  "Wisconsin",
                  "West Virginia",
                  "Wyoming"];

var stateHelper = {
	stateToInitial: function(longState) {
		states.forEach(function(state, index) {

			if(longState.toLowerCase() === state.toLowerCase()) {
				console.log('found the match', index);
				console.log('intiials', initials[index]);
				var ret = initials[index];
				return ret;
			}
		});
		
		return '';
	},
	initialsToState: function(shortState) {
		initials.forEach(function(initial, index) {

			if(shortState.toLowerCase() === initial.toLowerCase()) {
				console.log('found the match', index);
				console.log('state', states[index]);
				var ret = states[index];
				return ret;
			}
		});
		
	}
}

export default stateHelper;