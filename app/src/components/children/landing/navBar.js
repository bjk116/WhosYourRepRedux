import React from "react";
import ReactDOM from "react-dom";

const NavComponent = React.createClass({
  render: function() {
    return (
      <nav>

      </nav>
    );
  }
});

ReactDOM.render(<NavComponent />, document.querySelector("navbar"));