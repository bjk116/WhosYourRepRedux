var NavBar = React.createClass({
  render: function(){
    return(
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavBrand linkTo={this.props.brand.linkTo} text={this.props.brand.text} />
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse">
            <NavMenu links={this.props.links} />
          </div>
        </div>
      </nav>
    );
  }
});

//links and such
var navbar = {};

navbar.brand = 
  {linkTo: "#", text: "Who's Your Rep?"};

navbar.links = [
  {linkTo: "#", text: "Home"},
  {linkTo: "#", text: "Link 2"},
  {dropdown: true, text: "Dropdown", links: [
    {linkTo: "/home", text: "Dropdown Home"},
    {linkTo: "#", text: "Dropdown Link 2", active: true}
  ]}
];
//Class for title/logo
var NavBrand = React.createClass({
  render: function(){
    return (
      <a className="navbar-brand" href={this.props.linkTo}>{this.props.text}</a>
    ); 
  }
});
//Class for links of the links
var NavMenu = React.createClass({
  render: function(){
    //create and place all the functions from the navbar.links
    var links = this.props.links.map(function(link){
      if(link.dropdown) {
        return (
          <NavLinkDropdown links={link.links} text={link.text} active={link.active} />
        );
      }
      else {
        return (
          <NavLink linkTo={link.linkTo} text={link.text} active={link.active} />
        );
      }
    });
    //return actual variable
    return (
      <ul className="nav navbar-nav">
        {links}
      </ul>
    );
  }
});
//Class to give functionality to the dropdown menu
var NavLinkDropdown = React.createClass({
  render: function(){
    var active = false;
    var links = this.props.links.map(function(link){
      if(link.active){
        active = true;
      }
      return (
        <NavLink linkTo={link.linkTo} text={link.text} active={link.active} />
      );
    });
    return (
      <li className={"dropdown " + (active ? "active" : "")}>
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          {this.props.text}
          <span className="caret"></span>
        </a>
        <ul className="dropdown-menu">
          {links}
        </ul>
      </li>
    );
  }
});
//Class to check if links are active
var NavLink = React.createClass({
  render: function(){
    return(
      <li className={(this.props.active ? "active" : "")}><a href={this.props.linkTo}>{this.props.text}</a></li>
    );
  }
});

// render NavBar
React.render(
  <NavBar {...navbar} />,
  document.getElementById("navbar")
);