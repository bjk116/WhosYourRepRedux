import React from "react";

export class NavBar extends React.Compnent {

  state = {signedIn: false};

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    const pages = ["Home", "" , ""];
    const links = pages.map(page => {
      return (
        <a href={'/' + page}>
          {page}
        </a>
      )
    });
    return <nav>{links}</nav>;
    <Login />
  }
}


