"use strict";

var React = require('react');
var guiActions = require('../../actions/guiActions');


var Navigation = React.createClass({

  componentWillMount: function () {
    guiActions.checkLogin()
  },

  getPrivateLinks: function () {
    if (this.props.logedIn) {
      return (
        <span>
          <li className ="nav-item">
            <a className = "nav-link" href = "/docs">API documentation</a>
          </li>
        </span>
      )
    }
  },

  render: function () {
    return (
      <nav className = "nav">
        <ul className ="nav-list-left">
          <li className ="nav-item">
            <a className = "nav-link" href = "./#methodology">Methodology</a>
          </li>
          {this.getPrivateLinks()}
        </ul>

        <ul className ="nav-list">
          <li className ="nav-item">
            <a className = "nav-link" href = "/">Home</a>
          </li>
          <li className ="nav-item">
            <a className = "nav-link" href = "/impressum.html">Impressum</a>
          </li>
          
        </ul>
      </nav>
    );
  }
});

module.exports = Navigation;

