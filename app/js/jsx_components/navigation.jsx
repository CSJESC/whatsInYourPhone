"use strict";

var React = require('react');

var Navigation = React.createClass({

  render: function () {
    return (
      <nav className = "nav">
        <ul className ="nav-list-left">
          <li className ="nav-item">
            <a className = "nav-link" href = "./#methodology">Methodology</a>
          </li>
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