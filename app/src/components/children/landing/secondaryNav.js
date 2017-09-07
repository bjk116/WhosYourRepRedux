import React from "react";

export class NavBar extends React.Compnent {
  render() {
    const pages = ["Home", "" , ""];
    const links = pages.map(page => {
      return (
        <a href={'/' + page}>
          {page}
        </a>
      )
    });
    return <nav>{navLinks}</nav>;
  }
}


