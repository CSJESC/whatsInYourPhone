"use strict";

var React = require('react');

var UsedIn = React.createClass({

  render: function () {
    var parts = this.props.usedIn.map(function(partName) {
      return (
        <li className = "part-name">
          {partName}
        </li>
      );
    });

    return (
      <ul className = "used-in">
        <h3 className ="used-in-title">
          Used In:
        </h3>
        {parts}
      </ul>
    );
  }
});

module.exports = UsedIn;