"use strict";

var React = require('react');

var Navigation = React.createClass({

  render: function () {
    return (
      <nav className = "nav">
        <ul className ="nav-list">
          <li className ="nav-item">
            <a className = "nav-link" href = "">Impressum</a>
          </li>
          <li className ="nav-item">
            <a className = "nav-link" href = "">Contact Us</a>
          </li>
          <li className ="nav-item">
            <a className = "nav-link" href = "">Learn More</a>
          </li>
        </ul>
      </nav>
    );
  }
});

module.exports = Navigation;